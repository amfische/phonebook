<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Person;
use \Storage;

class PersonController extends Controller
{
    public function index()
    {
        $persons = Person::all();
        foreach ($persons as $p) {
            $p->formatted_phone = Person::formatPhoneNumber($p->phone);
            if (!is_null($p->avatar)) {
                $p->avatar = Storage::disk('public')->url('/avatars/' . $p->avatar);
            }
        }
        return view('persons.index', ['persons' => $persons]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'bail|required',
            'last_name' => 'bail|required',
            'title' => 'bail|required',
            'phone' => 'bail|required|numeric|digits:10',
            'avatar' => 'bail|file|image'
        ], [
            'phone.digits' => 'The phone number must be 10 digits'
        ]);

        $person = new Person();
        $person->first_name = $request->first_name;
        $person->last_name = $request->last_name;
        $person->title = $request->title;
        $person->phone = $request->phone;
        $person->save();

        if ($request->has('avatar')) {
            $name = $person->id . '-' . $request->avatar->getClientOriginalName();
            $request->file('avatar')->storeAs('avatars', $name, 'public');
            $person->avatar = $name;
            $person->save();
        }
        
        $flash_message = $person->first_name . ' ' . $person->last_name . ' has been successfully added to the phonebook!';
        return response()->json(['message' => $flash_message], 200);
    }

    public function update(Request $request, Person $person)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'title' => 'required',
            'phone' => 'bail|required|numeric|digits:10',
            'avatar' => 'bail|file|image'
        ], [
            'phone.digits' => 'The phone number must be 10 digits'
        ]);

        $person->first_name = $request->first_name;
        $person->last_name = $request->last_name;
        $person->title = $request->title;
        $person->phone = $request->phone;
        $person->save();

        if ($request->has('avatar')) {
            if (!is_null($person->avatar)) {
                Storage::disk('public')->delete('/avatars/' . $person->avatar);
            } 
            $name = $person->id . '-' . $request->avatar->getClientOriginalName();
            $request->file('avatar')->storeAs('avatars', $name, 'public');
            $person->avatar = $name;
            $person->save();
        }

        $flash_message = $person->first_name . ' ' . $person->last_name . ' has been successfully udpated!';
        return response()->json([ 'message' => $flash_message ], 200);
    }

    public function destroy(Person $person)
    {
        $flash_message = $person->first_name . ' ' . $person->last_name . ' has been successfully deleted from the phonebook.';
        if (!is_null($person->avatar)) {
            Storage::disk('public')->delete('/avatars/' . $person->avatar);
        } 
        $person->delete();
        return response()->json(['message' => $flash_message], 200);
    }
}
