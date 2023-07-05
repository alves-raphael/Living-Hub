<?php

use App\Http\Controllers\CommonAreaController;
use App\Http\Controllers\CondominiumController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Models\CommonArea;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('condominium')->group(function () {
        Route::get('/create', [CondominiumController::class, 'create'])->name('condominium.create');
        Route::post('/store', [CondominiumController::class, 'store'])->name('condominium.store');
        Route::get('/', [CondominiumController::class, 'index'])->name('condominium.index');
        Route::get('/{id}', [CondominiumController::class, 'edit'])->name('condominium.edit');
        Route::put('/{id}', [CondominiumController::class, 'update'])->name('condominium.update');
    });

    Route::prefix('common-area')->group(function () {
        Route::get('/create', [CommonAreaController::class, 'create'])->name('common-area.create');
        Route::post('/store', [CommonAreaController::class, 'store'])->name('common-area.store');
        Route::get('/', [CommonAreaController::class, 'index'])->name('common-area.index');
        Route::get('/{id}', [CommonAreaController::class, 'edit'])->name('common-area.edit');
        Route::put('/{id}', [CommonAreaController::class, 'update'])->name('common-area.update');
    });

    Route::prefix('reservations')->group(function () {
        Route::get('/mine', [ReservationController::class, 'mine'])->name('reservations.mine');
    });
});

require __DIR__ . '/auth.php';