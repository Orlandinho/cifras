<?php

namespace App\Http\Requests;

use App\Models\Artist;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateSongRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'artist' => Str::title(Str::lower($this->artist)),
            'artist_slug' => Str::slug($this->artist, '-'),
            'title' => Str::title(Str::lower($this->title)),
            'slug' => Str::slug($this->title, '-'),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $artist = Artist::where('slug', Str::slug($this->artist, '-'))->first();
        return [
            'artist' => ['required', 'string', 'max:255'],
            'artist_slug' => ['required', 'string', 'max:255', Rule::unique('artists', 'slug')->ignore($artist->id ?? $this->song->artist_id)],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'max:255', 'url'],
            'body' => ['required', 'string', 'max:5000'],
            'tags' => ['nullable', 'array', 'exists:tags,id'],
        ];
    }
}
