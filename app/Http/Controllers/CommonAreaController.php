<?php

namespace App\Http\Controllers;

use App\Models\CommonArea;
use App\Models\Condominium;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class CommonAreaController extends Controller
{
    const RULES = [
        'name' => 'required|string|min:3',
        'condominium_id' => 'required|int'
    ];

    private function getSelectableCondominia(): Collection
    {
        return Condominium::all()->map(function ($condo) {
            return ['value' => $condo->id, 'label' => $condo->name];
        });
    }
    public function create()
    {
        $condominia = $this->getSelectableCondominia();
        return Inertia::render('CommonArea/Create', compact('condominia'));
    }

    public function store(Request $request)
    {
        $request->validate(self::RULES);

        CommonArea::create($request->all());
        return redirect('condominium')->with('success', 'Condomínio cadastrado com sucesso');
    }

    public function index()
    {
        $commonAreas = CommonArea::all();
        $commonAreas->load('condominium');
        return Inertia::render(
            'CommonArea/Index',
            compact(
                'commonAreas'
            )
        );
    }

    public function edit(Request $request, int $id)
    {
        $commonArea = CommonArea::find($id);
        $condominia = $this->getSelectableCondominia();
        $commonArea->load('condominium');
        return Inertia::render('CommonArea/Update', compact('condominia', 'id', 'commonArea'));
    }

    public function update(Request $request, int $id)
    {
        $request->validate(['name' => 'required|string|min:3']);
        $commonArea = CommonArea::find($id);
        $commonArea->fill($request->all());
        $commonArea->save();
        return redirect('common-area')->with('success', 'Área Comum atualizado com sucesso');
    }
}