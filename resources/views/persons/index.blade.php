@extends('layouts.master')

@section('content')


<h1 class="my-5">Phonebook Application</h1>
<div class="d-flex align-items-center justify-content-between">
	<input type="text">
	<button type="button" class="btn btn-success" data-toggle="modal" data-target="#createModal">create</button>
</div>
<main>

</main>

@include('persons.modals.create')

@endsection
