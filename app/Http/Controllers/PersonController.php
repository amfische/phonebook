<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Person;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $persons = Person::all();
        return view('persons.index', ['persons' => $persons]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'bail|required',
            'last_name' => 'bail|required',
            'title' => 'bail|required',
            'phone' => 'bail|required|numeric|size:10'
        ], [
            'phone.size' => 'The phone number must be 10 digits'
        ]);

        $person = new Person();
        $person->first_name = $request->first_name;
        $person->last_name = $request->last_name;
        $person->title = $request->title;
        $person->phone = $request->phone;
        $person->save();

        return response()->json([ 'status' => $person->first_name . ' ' . $person->last_name . ' was successfully added to the phonebook!'], 200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'bail|required',
            'last_name' => 'bail|required',
            'title' => 'bail|required',
            'phone' => 'bail|required|numeric|size:10'
        ], [
            'phone.size' => 'The phone number must be 10 digits'
        ]);

        $person = Person::find($id);
        $person->first_name = $request->first_name;
        $person->last_name = $request->last_name;
        $person->title = $request->title;
        $person->phone = $request->phone;
        $person->save();

        return response()->json([ 'status' => 'Contact successfully updated!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
