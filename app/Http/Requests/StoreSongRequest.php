<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreSongRequest extends FormRequest
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
            'body' => Str::replace("\t", " ", $this->body),
            'artist' => Str::title(Str::lower($this->artist)),
            'title' => Str::title(Str::lower($this->title)),
            'artist_slug' => Str::slug($this->artist, '-'),
            'slug' => Str::slug($this->title, '-'),
            'lyrics' => $this->lyrics
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'artist' => ['required', 'string', 'max:255'],
            'artist_slug' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'max:255', 'url'],
            'body' => ['required', 'string', 'max:5000'],
            'lyrics' => ['nullable', 'string', 'max:3000'],
            'tags' => ['nullable', 'array', 'exists:tags,id'],
        ];
    }
}
