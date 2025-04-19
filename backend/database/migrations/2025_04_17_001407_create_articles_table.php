<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrainted('users', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->text('content');
            $table->text('cover')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->foreignId('category_id')->constrainted('categories', 'id')->cascadeOnDelete()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
