<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Grupo Exaltai',
            'email' => 'grupoexaltai@ipvg.com.br',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        $tags = ['Adoração', 'Perdão', 'Páscoa', 'Natal', 'Comunhão', 'Louvor', 'Gratidão', 'Alegria'];

        foreach ($tags as $tag) {
            Tag::create([
                'name' => $tag,
                'slug' => Str::slug($tag, '-'),
            ]);
        }
    }
}
