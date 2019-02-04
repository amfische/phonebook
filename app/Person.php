<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'persons';

    public static function formatPhoneNumber($number)
    {
    	$arr = preg_split('//', $number, -1, PREG_SPLIT_NO_EMPTY);
		$result = '';
		for($i = 0; $i < count($arr); $i++) {
		    if ($i === 0) {
		        $result .= '(' . $arr[$i];
		    } else if ($i === 2) {
		        $result .= $arr[$i] . ') ';
		    } else if ($i === 5) {
		        $result .= $arr[$i] . ' - ';
		    } else {
		        $result .= $arr[$i];
		    }
		}
		return $result;
    }

}
