<?php

namespace App\Misc;

use Illuminate\Support\Collection;
use Illuminate\Support\Stringable;

class BibleVerses
{
    /**
     * Get a Bible verse.
     *
     * @return string
     */
    public static function quote(): string
    {
        return static::quotes()
            ->map(fn ($verse) => static::formatForConsole($verse))
            ->random();
    }

    /**
     * Get the collection of Bible verses.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function quotes(): Collection
    {
        return new Collection([
            "Servi ao Senhor com alegria, apresentai-vos diante dele com cântico. + Salmos 100:2",
            "Grande é o Senhor e mui digno de ser louvado; a sua grandeza é insondável. + Salmos 145:3",
        ]);
    }

    /**
     * Formats the given Bible verse for a pretty console output.
     *
     * @param string $verse
     * @return string
     */
    protected static function formatForConsole(string $verse): string
    {
        [$text, $reference] = (new Stringable($verse))->explode('+');

        return sprintf(
            "\n  <options=bold>“ %s ”</>\n  <fg=gray>- %s</>\n",
            trim($text),
            trim($reference),
        );
    }
}

