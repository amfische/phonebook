@extends('layouts.master')

@section('content')

<h1 class="app-title my-5">Phonebook Application</h1>

<div id="status-alert" class="alert alert-success my-4 d-none" role="alert">
	<button type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

<div class="d-flex align-items-center justify-content-between mb-5 search-and-create">
	<input type="text" class="form-control">
	<button type="button" class="btn btn-success d-lg-none" data-toggle="modal" data-target="#createModal">+</button>
	<button type="button" class="btn btn-success d-none d-lg-block" data-toggle="modal" data-target="#createModal">create</button>
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
				<img src="https://via.placeholder.com/85" alt="placeholder image">
			@else
				<img src="{{ $person->avatar }}" alt="profile picture" style="height: 85px; width: 85px">
			@endif
			<div class="d-flex flex-column justify-content-between flex-grow-1 px-2 flex-lg-row align-items-lg-center px-lg-4">
				<div class="name-and-title">
					<h2 class="m-0">{{ $person->first_name . ' ' . $person->last_name }}</h2>
					<p class="m-0">{{ $person->title }}</p>
				</div>
				<p class="phone-number m-0 px-lg-5">{{ $person->formatted_phone }}</p>
			</div>
			<div class="d-flex flex-column flex-lg-row">
				<button 
					class="btn btn-sm btn-info my-1 my-lg-0 mx-lg-2 px-lg-4" id="{{ 'edit-btn_' . $person->id }}"
					data-toggle="modal" data-target="#editModal" 
					data-id="{{ $person->id }}"
					data-fn="{{ $person->first_name }}"
					data-ln="{{ $person->last_name }}"
					data-title="{{ $person->title }}"
					data-phone="{{ $person->phone }}"
					data-avatar="{{ $person->avatar }}">
					edit
				</button>
				<button 
					class="btn btn-sm btn-danger my-1 my-lg-0 mx-lg-2 px-lg-4" id="{{ 'delete-btn_' . $person->id }}"
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
