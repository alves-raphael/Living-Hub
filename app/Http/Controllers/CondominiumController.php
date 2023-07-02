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
        return redirect('condominium')->with('success', 'Condomínio cadastrado com sucesso');
    }

    public function index()
    {
        $condominia = Condominium::all();
        return Inertia::render(
            'Condominium/Index',
            compact(
                'condominia'
            )
        );
    }

    public function edit(Request $request, int $id)
    {
        $condominium = Condominium::find($id);
        return Inertia::render('Condominium/Update', compact('condominium', 'id'));
    }

    public function update(Request $request, int $id)
    {
        $request->validate(['name' => 'required|string|min:3']);
        $condominium = Condominium::find($id);
        $condominium->name = $request->get('name');
        $condominium->save();
        return redirect('condominium')->with('success', 'Condomínio atualizado com sucesso');
    }
}