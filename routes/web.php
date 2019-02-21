<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'PersonController@index');
Route::post('/contact/create', 'PersonController@store')->name('contact.create');
Route::put('/contact/{person}', 'PersonController@update')->name('contact.update');
Route::delete('/contact/{person}', 'PersonController@destroy');
