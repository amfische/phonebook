@extends('layouts.master')

@section('content')


<h1 class="my-5">Phonebook Application</h1>

<div id="status-alert" class="alert alert-success my-4 d-none" role="alert">
	<button type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

<div class="d-flex align-items-center justify-content-between mb-5">
	<input type="text" class="form-control w-50">
	<button type="button" class="btn btn-success" data-toggle="modal" data-target="#createModal">create</button>
</div>

<main role="main" class="mt-5">

	@foreach($persons as $person)
		<div class="media align-items-center justify-content-between pb-3 mb-5" style="border-bottom: 1px solid black">
			<img src="https://via.placeholder.com/65" alt="placeholder image">
			<div class="d-flex align-items-center justify-content-between flex-grow-1 px-4">
				<div>
					<h2 id="{{ 'name-' . $person->id }}" class="m-0">{{ $person->first_name . ' ' . $person->last_name }}</h2>
					<p id="{{ 'title-' . $person->id }}" class="m-0">{{ $person->title }}</p>
				</div>
				<p id="{{ 'phone-' . $person->id }}" class="m-0 px-5" style="font-size: 2rem;">{{ $person->phone }}</p>
			</div>
			<div>
				<button class="btn btn-sm btn-info mx-2 px-4" data-toggle="modal" data-target="#editModal" data-info="{{ $person }}">edit</button>
				<button class="btn btn-sm btn-danger mx-2 px-4">delete</button>
			</div>
		</div>
	@endforeach

</main>

@include('persons.modals.create')
@include('persons.modals.edit')

@endsection
