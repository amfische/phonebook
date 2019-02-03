<!DOCTYPE html>
<html lang='en'>
<head>

		<meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
		<meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

		<link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <title>MPS Phonebook</title>


</head>
<body>
	<div class="container">
		@yield('content')
	</div>

	<script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>
