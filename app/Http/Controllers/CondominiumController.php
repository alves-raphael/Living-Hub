<?php

namespace App\Http\Controllers;

use App\Models\Condominium;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CondominiumController extends Controller
{
    public function create()
    {
        return Inertia::render('Condominium/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|min:3']);

        Condominium::create($request->all());
        return redirect(RouteServiceProvider::HOME)->with('success', 'Condomínio cadastrado com sucesso');
    }
}