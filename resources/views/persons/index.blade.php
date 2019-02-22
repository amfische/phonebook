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

<main role="main" class="mt-5 pt-5">
	@if(count($persons) === 0)
		<div class="alert alert-info">
			Looks like you don't have any contacts.. go make some friends!
		</div>
	@endif
	@foreach($persons as $person)
		<div class="media align-items-center justify-content-between pb-3 mb-5" style="border-bottom: 1px solid black">
			@if(is_null($person->avatar))
				<img src="https://via.placeholder.com/65" alt="placeholder image">
			@else
				<img src="{{ $person->avatar }}" alt="profile picture" style="height: 65px; width: 65px">
			@endif
			<div class="d-flex align-items-center justify-content-between flex-grow-1 px-4">
				<div>
					<h2 id="{{ 'name-' . $person->id }}" class="m-0">{{ $person->first_name . ' ' . $person->last_name }}</h2>
					<p id="{{ 'title-' . $person->id }}" class="m-0">{{ $person->title }}</p>
				</div>
				<p id="{{ 'phone-' . $person->id }}" class="m-0 px-5" style="font-size: 2rem;">{{ $person->formatted_phone }}</p>
			</div>
			<div>
				<button 
					class="btn btn-sm btn-info mx-2 px-4" id="{{ 'edit-btn_' . $person->id }}"
					data-toggle="modal" data-target="#editModal" 
					data-id="{{ $person->id }}"
					data-fn="{{ $person->first_name }}"
					data-ln="{{ $person->last_name }}"
					data-title="{{ $person->title }}"
					data-phone="{{ $person->phone }}"
					data-image="{{ $person->file }}">
					edit
				</button>
				<button 
					class="btn btn-sm btn-danger mx-2 px-4" id="{{ 'delete-btn_' . $person->id }}"
					data-toggle="modal" data-target="#deleteModal" 
					data-id="{{ $person->id }}" 
					data-fn="{{ $person->first_name }}" 
					data-ln="{{ $person->last_name }}">
					delete
				</button>
			</div>
		</div>
	@endforeach

</main>

@include('persons.modals.create')
@include('persons.modals.edit')
@include('persons.modals.delete')

@endsection
