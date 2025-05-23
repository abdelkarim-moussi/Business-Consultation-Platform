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
        Schema::create('disponibilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultant_id')->constrained('users', 'id')->deleteOnCascade()->updateOnCascade();
            $table->date('date');
            $table->time('startTime');
            $table->time('endTime');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disponibilities');
    }
};
