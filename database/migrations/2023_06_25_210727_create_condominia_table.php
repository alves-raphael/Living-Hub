<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('condominia', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('condominium_id')->nullable();
            $table->foreign('condominium_id')->references('id')->on('condominia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('condominia');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_condominium_id_foreign');
            $table->dropColumn('condominium_id');
        });
    }
};