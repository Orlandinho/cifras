<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Model::shouldBeStrict(! app()->isProduction());

        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(app()->isProduction());

        RedirectResponse::macro('alertSuccess', function (string $message, string $title = 'Sucesso!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'success',
                'title' => $title
            ]);
        });

        RedirectResponse::macro('alertFailure', function (string $message, string $title = 'Erro!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'failure',
                'title' => $title
            ]);
        });

        RedirectResponse::macro('alertWarning', function (string $message, string $title = 'Atenção!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'attention',
                'title' => $title
            ]);
        });
    }
}
