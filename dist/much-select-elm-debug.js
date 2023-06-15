// -- (function(scope){
// -- 'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEBUG mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


/*
function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
*/


/*
function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
*/




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


function _Debugger_unsafeCoerce(value)
{
	return value;
}



// PROGRAMS


var _Debugger_element = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3($elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		$elm$browser$Debugger$Main$wrapUpdate(impl.update),
		$elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			var currNode = _VirtualDom_virtualize(domNode);
			var currBlocker = $elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			var cornerNode = _VirtualDom_doc.createElement('div');
			domNode.parentNode.insertBefore(cornerNode, domNode.nextSibling);
			var cornerCurr = _VirtualDom_virtualize(cornerNode);

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = A2(_VirtualDom_map, $elm$browser$Debugger$Main$UserMsg, view($elm$browser$Debugger$Main$getUserModel(model)));
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;

				// update blocker

				var nextBlocker = $elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view corner

				var cornerNext = $elm$browser$Debugger$Main$cornerView(model);
				var cornerPatches = _VirtualDom_diff(cornerCurr, cornerNext);
				cornerNode = _VirtualDom_applyPatches(cornerNode, cornerCurr, cornerPatches, sendToApp);
				cornerCurr = cornerNext;

				if (!model.popout.b)
				{
					currPopout = undefined;
					return;
				}

				// view popout

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = $elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


var _Debugger_document = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3($elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		$elm$browser$Debugger$Main$wrapUpdate(impl.update),
		$elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var divertHrefToApp = impl.setup && impl.setup(function(x) { return sendToApp($elm$browser$Debugger$Main$UserMsg(x)); });
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			var currBlocker = $elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view($elm$browser$Debugger$Main$getUserModel(model));
				var nextNode = _VirtualDom_node('body')(_List_Nil)(
					_Utils_ap(
						A2($elm$core$List$map, _VirtualDom_map($elm$browser$Debugger$Main$UserMsg), doc.body),
						_List_Cons($elm$browser$Debugger$Main$cornerView(model), _List_Nil)
					)
				);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);

				// update blocker

				var nextBlocker = $elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view popout

				if (!model.popout.b) { currPopout = undefined; return; }

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = $elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


function _Debugger_popout()
{
	return {
		b: undefined,
		a: undefined
	};
}

function _Debugger_isOpen(popout)
{
	return !!popout.b;
}

function _Debugger_open(popout)
{
	return _Scheduler_binding(function(callback)
	{
		_Debugger_openWindow(popout);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}

function _Debugger_openWindow(popout)
{
	var w = $elm$browser$Debugger$Main$initialWindowWidth,
		h = $elm$browser$Debugger$Main$initialWindowHeight,
	 	x = screen.width - w,
		y = screen.height - h;

	var debuggerWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);
	var doc = debuggerWindow.document;
	doc.title = 'Elm Debugger';

	// handle arrow keys
	doc.addEventListener('keydown', function(event) {
		event.metaKey && event.which === 82 && window.location.reload();
		event.key === 'ArrowUp'   && (popout.a($elm$browser$Debugger$Main$Up  ), event.preventDefault());
		event.key === 'ArrowDown' && (popout.a($elm$browser$Debugger$Main$Down), event.preventDefault());
	});

	// handle window close
	window.addEventListener('unload', close);
	debuggerWindow.addEventListener('unload', function() {
		popout.b = undefined;
		popout.a($elm$browser$Debugger$Main$NoOp);
		window.removeEventListener('unload', close);
	});

	function close() {
		popout.b = undefined;
		popout.a($elm$browser$Debugger$Main$NoOp);
		debuggerWindow.close();
	}

	// register new window
	popout.b = doc;
}



// SCROLL


function _Debugger_scroll(popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msgs = popout.b.getElementById('elm-debugger-sidebar');
			if (msgs && msgs.scrollTop !== 0)
			{
				msgs.scrollTop = 0;
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


var _Debugger_scrollTo = F2(function(id, popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msg = popout.b.getElementById(id);
			if (msg)
			{
				msg.scrollIntoView(false);
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});



// UPLOAD


function _Debugger_upload(popout)
{
	return _Scheduler_binding(function(callback)
	{
		var doc = popout.b || document;
		var element = doc.createElement('input');
		element.setAttribute('type', 'file');
		element.setAttribute('accept', 'text/json');
		element.style.display = 'none';
		element.addEventListener('change', function(event)
		{
			var fileReader = new FileReader();
			fileReader.onload = function(e)
			{
				callback(_Scheduler_succeed(e.target.result));
			};
			fileReader.readAsText(event.target.files[0]);
			doc.body.removeChild(element);
		});
		doc.body.appendChild(element);
		element.click();
	});
}



// DOWNLOAD


var _Debugger_download = F2(function(historyLength, json)
{
	return _Scheduler_binding(function(callback)
	{
		var fileName = 'history-' + historyLength + '.txt';
		var jsonString = JSON.stringify(json);
		var mime = 'text/plain;charset=utf-8';
		var done = _Scheduler_succeed(_Utils_Tuple0);

		// for IE10+
		if (navigator.msSaveBlob)
		{
			navigator.msSaveBlob(new Blob([jsonString], {type: mime}), fileName);
			return callback(done);
		}

		// for HTML5
		var element = document.createElement('a');
		element.setAttribute('href', 'data:' + mime + ',' + encodeURIComponent(jsonString));
		element.setAttribute('download', fileName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		callback(done);
	});
});



// POPOUT CONTENT


function _Debugger_messageToString(value)
{
	if (typeof value === 'boolean')
	{
		return value ? 'True' : 'False';
	}

	if (typeof value === 'number')
	{
		return value + '';
	}

	if (typeof value === 'string')
	{
		return '"' + _Debugger_addSlashes(value, false) + '"';
	}

	if (value instanceof String)
	{
		return "'" + _Debugger_addSlashes(value, true) + "'";
	}

	if (typeof value !== 'object' || value === null || !('$' in value))
	{
		return '…';
	}

	if (typeof value.$ === 'number')
	{
		return '…';
	}

	var code = value.$.charCodeAt(0);
	if (code === 0x23 /* # */ || /* a */ 0x61 <= code && code <= 0x7A /* z */)
	{
		return '…';
	}

	if (['Array_elm_builtin', 'Set_elm_builtin', 'RBNode_elm_builtin', 'RBEmpty_elm_builtin'].indexOf(value.$) >= 0)
	{
		return '…';
	}

	var keys = Object.keys(value);
	switch (keys.length)
	{
		case 1:
			return value.$;
		case 2:
			return value.$ + ' ' + _Debugger_messageToString(value.a);
		default:
			return value.$ + ' … ' + _Debugger_messageToString(value[keys[keys.length - 1]]);
	}
}


function _Debugger_init(value)
{
	if (typeof value === 'boolean')
	{
		return A3($elm$browser$Debugger$Expando$Constructor, $elm$core$Maybe$Just(value ? 'True' : 'False'), true, _List_Nil);
	}

	if (typeof value === 'number')
	{
		return $elm$browser$Debugger$Expando$Primitive(value + '');
	}

	if (typeof value === 'string')
	{
		return $elm$browser$Debugger$Expando$S('"' + _Debugger_addSlashes(value, false) + '"');
	}

	if (value instanceof String)
	{
		return $elm$browser$Debugger$Expando$S("'" + _Debugger_addSlashes(value, true) + "'");
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (tag === '::' || tag === '[]')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$ListSeq, true,
				A2($elm$core$List$map, _Debugger_init, value)
			);
		}

		if (tag === 'Set_elm_builtin')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$SetSeq, true,
				A3($elm$core$Set$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (tag === 'RBNode_elm_builtin' || tag == 'RBEmpty_elm_builtin')
		{
			return A2($elm$browser$Debugger$Expando$Dictionary, true,
				A3($elm$core$Dict$foldr, _Debugger_initKeyValueCons, _List_Nil, value)
			);
		}

		if (tag === 'Array_elm_builtin')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$ArraySeq, true,
				A3($elm$core$Array$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (typeof tag === 'number')
		{
			return $elm$browser$Debugger$Expando$Primitive('<internals>');
		}

		var char = tag.charCodeAt(0);
		if (char === 35 || 65 <= char && char <= 90)
		{
			var list = _List_Nil;
			for (var i in value)
			{
				if (i === '$') continue;
				list = _List_Cons(_Debugger_init(value[i]), list);
			}
			return A3($elm$browser$Debugger$Expando$Constructor, char === 35 ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(tag), true, $elm$core$List$reverse(list));
		}

		return $elm$browser$Debugger$Expando$Primitive('<internals>');
	}

	if (typeof value === 'object')
	{
		var dict = $elm$core$Dict$empty;
		for (var i in value)
		{
			dict = A3($elm$core$Dict$insert, i, _Debugger_init(value[i]), dict);
		}
		return A2($elm$browser$Debugger$Expando$Record, true, dict);
	}

	return $elm$browser$Debugger$Expando$Primitive('<internals>');
}

var _Debugger_initCons = F2(function initConsHelp(value, list)
{
	return _List_Cons(_Debugger_init(value), list);
});

var _Debugger_initKeyValueCons = F3(function(key, value, list)
{
	return _List_Cons(
		_Utils_Tuple2(_Debugger_init(key), _Debugger_init(value)),
		list
	);
});

function _Debugger_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}



// BLOCK EVENTS


function _Debugger_updateBlocker(oldBlocker, newBlocker)
{
	if (oldBlocker === newBlocker) return;

	var oldEvents = _Debugger_blockerToEvents(oldBlocker);
	var newEvents = _Debugger_blockerToEvents(newBlocker);

	// remove old blockers
	for (var i = 0; i < oldEvents.length; i++)
	{
		document.removeEventListener(oldEvents[i], _Debugger_blocker, true);
	}

	// add new blockers
	for (var i = 0; i < newEvents.length; i++)
	{
		document.addEventListener(newEvents[i], _Debugger_blocker, true);
	}
}


function _Debugger_blocker(event)
{
	if (event.type === 'keydown' && event.metaKey && event.which === 82)
	{
		return;
	}

	var isScroll = event.type === 'scroll' || event.type === 'wheel';
	for (var node = event.target; node; node = node.parentNode)
	{
		if (isScroll ? node.id === 'elm-debugger-details' : node.id === 'elm-debugger-overlay')
		{
			return;
		}
	}

	event.stopPropagation();
	event.preventDefault();
}

function _Debugger_blockerToEvents(blocker)
{
	return blocker === $elm$browser$Debugger$Overlay$BlockNone
		? []
		: blocker === $elm$browser$Debugger$Overlay$BlockMost
			? _Debugger_mostEvents
			: _Debugger_allEvents;
}

var _Debugger_mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var _Debugger_allEvents = _Debugger_mostEvents.concat('wheel', 'scroll');




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Debugger$Expando$ArraySeq = {$: 'ArraySeq'};
var $elm$browser$Debugger$Overlay$BlockMost = {$: 'BlockMost'};
var $elm$browser$Debugger$Overlay$BlockNone = {$: 'BlockNone'};
var $elm$browser$Debugger$Expando$Constructor = F3(
	function (a, b, c) {
		return {$: 'Constructor', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$Dictionary = F2(
	function (a, b) {
		return {$: 'Dictionary', a: a, b: b};
	});
var $elm$browser$Debugger$Main$Down = {$: 'Down'};
var $elm$browser$Debugger$Expando$ListSeq = {$: 'ListSeq'};
var $elm$browser$Debugger$Main$NoOp = {$: 'NoOp'};
var $elm$browser$Debugger$Expando$Primitive = function (a) {
	return {$: 'Primitive', a: a};
};
var $elm$browser$Debugger$Expando$Record = F2(
	function (a, b) {
		return {$: 'Record', a: a, b: b};
	});
var $elm$browser$Debugger$Expando$S = function (a) {
	return {$: 'S', a: a};
};
var $elm$browser$Debugger$Expando$Sequence = F3(
	function (a, b, c) {
		return {$: 'Sequence', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$SetSeq = {$: 'SetSeq'};
var $elm$browser$Debugger$Main$Up = {$: 'Up'};
var $elm$browser$Debugger$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var $elm$browser$Debugger$Main$Export = {$: 'Export'};
var $elm$browser$Debugger$Main$Import = {$: 'Import'};
var $elm$browser$Debugger$Main$Open = {$: 'Open'};
var $elm$browser$Debugger$Main$OverlayMsg = function (a) {
	return {$: 'OverlayMsg', a: a};
};
var $elm$browser$Debugger$Main$Resume = {$: 'Resume'};
var $elm$browser$Debugger$Main$isPaused = function (state) {
	if (state.$ === 'Running') {
		return false;
	} else {
		return true;
	}
};
var $elm$browser$Debugger$History$size = function (history) {
	return history.numMessages;
};
var $elm$browser$Debugger$Overlay$Accept = function (a) {
	return {$: 'Accept', a: a};
};
var $elm$browser$Debugger$Overlay$Choose = F2(
	function (a, b) {
		return {$: 'Choose', a: a, b: b};
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$browser$Debugger$Overlay$goodNews1 = '\nThe good news is that having values like this in your message type is not\nso great in the long run. You are better off using simpler data, like\n';
var $elm$browser$Debugger$Overlay$goodNews2 = '\nfunction can pattern match on that data and call whatever functions, JSON\ndecoders, etc. you need. This makes the code much more explicit and easy to\nfollow for other readers (or you in a few months!)\n';
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$browser$Debugger$Overlay$viewCode = function (name) {
	return A2(
		$elm$html$Html$code,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(name)
			]));
};
var $elm$browser$Debugger$Overlay$addCommas = function (items) {
	if (!items.b) {
		return '';
	} else {
		if (!items.b.b) {
			var item = items.a;
			return item;
		} else {
			if (!items.b.b.b) {
				var item1 = items.a;
				var _v1 = items.b;
				var item2 = _v1.a;
				return item1 + (' and ' + item2);
			} else {
				var lastItem = items.a;
				var otherItems = items.b;
				return A2(
					$elm$core$String$join,
					', ',
					_Utils_ap(
						otherItems,
						_List_fromArray(
							[' and ' + lastItem])));
			}
		}
	}
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$browser$Debugger$Overlay$problemToString = function (problem) {
	switch (problem.$) {
		case 'Function':
			return 'functions';
		case 'Decoder':
			return 'JSON decoders';
		case 'Task':
			return 'tasks';
		case 'Process':
			return 'processes';
		case 'Socket':
			return 'web sockets';
		case 'Request':
			return 'HTTP requests';
		case 'Program':
			return 'programs';
		default:
			return 'virtual DOM values';
	}
};
var $elm$browser$Debugger$Overlay$viewProblemType = function (_v0) {
	var name = _v0.name;
	var problems = _v0.problems;
	return A2(
		$elm$html$Html$li,
		_List_Nil,
		_List_fromArray(
			[
				$elm$browser$Debugger$Overlay$viewCode(name),
				$elm$html$Html$text(
				' can contain ' + ($elm$browser$Debugger$Overlay$addCommas(
					A2($elm$core$List$map, $elm$browser$Debugger$Overlay$problemToString, problems)) + '.'))
			]));
};
var $elm$browser$Debugger$Overlay$viewBadMetadata = function (_v0) {
	var message = _v0.message;
	var problems = _v0.problems;
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The '),
					$elm$browser$Debugger$Overlay$viewCode(message),
					$elm$html$Html$text(' type of your program cannot be reliably serialized for history files.')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Functions cannot be serialized, nor can values that contain functions. This is a problem in these places:')
				])),
			A2(
			$elm$html$Html$ul,
			_List_Nil,
			A2($elm$core$List$map, $elm$browser$Debugger$Overlay$viewProblemType, problems)),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text($elm$browser$Debugger$Overlay$goodNews1),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://guide.elm-lang.org/types/custom_types.html')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('custom types')
						])),
					$elm$html$Html$text(', in your messages. From there, your '),
					$elm$browser$Debugger$Overlay$viewCode('update'),
					$elm$html$Html$text($elm$browser$Debugger$Overlay$goodNews2)
				]))
		]);
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$browser$Debugger$Overlay$Cancel = {$: 'Cancel'};
var $elm$browser$Debugger$Overlay$Proceed = {$: 'Proceed'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$browser$Debugger$Overlay$viewButtons = function (buttons) {
	var btn = F2(
		function (msg, string) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-right', '20px'),
						$elm$html$Html$Events$onClick(msg)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(string)
					]));
		});
	var buttonNodes = function () {
		if (buttons.$ === 'Accept') {
			var proceed = buttons.a;
			return _List_fromArray(
				[
					A2(btn, $elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		} else {
			var cancel = buttons.a;
			var proceed = buttons.b;
			return _List_fromArray(
				[
					A2(btn, $elm$browser$Debugger$Overlay$Cancel, cancel),
					A2(btn, $elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '60px'),
				A2($elm$html$Html$Attributes$style, 'line-height', '60px'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		buttonNodes);
};
var $elm$browser$Debugger$Overlay$viewMessage = F4(
	function (config, title, details, buttons) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('elm-debugger-overlay'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100vw'),
					A2($elm$html$Html$Attributes$style, 'height', '100vh'),
					A2($elm$html$Html$Attributes$style, 'color', 'white'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
					A2($elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2147483647')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '600px'),
							A2($elm$html$Html$Attributes$style, 'height', '100vh'),
							A2($elm$html$Html$Attributes$style, 'padding-left', 'calc(50% - 300px)'),
							A2($elm$html$Html$Attributes$style, 'padding-right', 'calc(50% - 300px)'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
									A2($elm$html$Html$Attributes$style, 'height', '80px'),
									A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)'),
									A2($elm$html$Html$Attributes$style, 'padding-left', '22px'),
									A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
									A2($elm$html$Html$Attributes$style, 'line-height', '80px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(title)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$id('elm-debugger-details'),
									A2($elm$html$Html$Attributes$style, 'padding', ' 8px 20px'),
									A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2($elm$html$Html$Attributes$style, 'max-height', 'calc(100vh - 156px)'),
									A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)')
								]),
							details),
							A2(
							$elm$html$Html$map,
							config.wrap,
							$elm$browser$Debugger$Overlay$viewButtons(buttons))
						]))
				]));
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$browser$Debugger$Overlay$viewShape = F4(
	function (x, y, angle, coordinates) {
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'polygon',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'points', coordinates),
					A2(
					$elm$virtual_dom$VirtualDom$attribute,
					'transform',
					'translate(' + ($elm$core$String$fromFloat(x) + (' ' + ($elm$core$String$fromFloat(y) + (') rotate(' + ($elm$core$String$fromFloat(-angle) + ')'))))))
				]),
			_List_Nil);
	});
var $elm$browser$Debugger$Overlay$elmLogo = A4(
	$elm$virtual_dom$VirtualDom$nodeNS,
	'http://www.w3.org/2000/svg',
	'svg',
	_List_fromArray(
		[
			A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '-300 -300 600 600'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'fill', 'currentColor'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'width', '24px'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'height', '24px')
		]),
	_List_fromArray(
		[
			A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'g',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'transform', 'scale(1 -1)')
				]),
			_List_fromArray(
				[
					A4($elm$browser$Debugger$Overlay$viewShape, 0, -210, 0, '-280,-90 0,190 280,-90'),
					A4($elm$browser$Debugger$Overlay$viewShape, -210, 0, 90, '-280,-90 0,190 280,-90'),
					A4($elm$browser$Debugger$Overlay$viewShape, 207, 207, 45, '-198,-66 0,132 198,-66'),
					A4($elm$browser$Debugger$Overlay$viewShape, 150, 0, 0, '-130,0 0,-130 130,0 0,130'),
					A4($elm$browser$Debugger$Overlay$viewShape, -89, 239, 0, '-191,61 69,61 191,-61 -69,-61'),
					A4($elm$browser$Debugger$Overlay$viewShape, 0, 106, 180, '-130,-44 0,86  130,-44'),
					A4($elm$browser$Debugger$Overlay$viewShape, 256, -150, 270, '-130,-44 0,86  130,-44')
				]))
		]));
var $elm$core$String$length = _String_length;
var $elm$browser$Debugger$Overlay$viewMiniControls = F2(
	function (config, numMsgs) {
		var string = $elm$core$String$fromInt(numMsgs);
		var width = $elm$core$String$fromInt(
			2 + $elm$core$String$length(string));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'bottom', '2em'),
					A2($elm$html$Html$Attributes$style, 'right', '2em'),
					A2($elm$html$Html$Attributes$style, 'width', 'calc(42px + ' + (width + 'ch)')),
					A2($elm$html$Html$Attributes$style, 'height', '36px'),
					A2($elm$html$Html$Attributes$style, 'background-color', '#1293D8'),
					A2($elm$html$Html$Attributes$style, 'color', 'white'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2147483647'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(config.open)
				]),
			_List_fromArray(
				[
					$elm$browser$Debugger$Overlay$elmLogo,
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', 'calc(1ch + 6px)'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '1ch')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(string)
						]))
				]));
	});
var $elm$browser$Debugger$Overlay$explanationBad = '\nThe messages in this history do not match the messages handled by your\nprogram. I noticed changes in the following types:\n';
var $elm$browser$Debugger$Overlay$explanationRisky = '\nThis history seems old. It will work with this program, but some\nmessages have been added since the history was created:\n';
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$browser$Debugger$Overlay$viewMention = F2(
	function (tags, verbed) {
		var _v0 = A2(
			$elm$core$List$map,
			$elm$browser$Debugger$Overlay$viewCode,
			$elm$core$List$reverse(tags));
		if (!_v0.b) {
			return $elm$html$Html$text('');
		} else {
			if (!_v0.b.b) {
				var tag = _v0.a;
				return A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(verbed),
							tag,
							$elm$html$Html$text('.')
						]));
			} else {
				if (!_v0.b.b.b) {
					var tag2 = _v0.a;
					var _v1 = _v0.b;
					var tag1 = _v1.a;
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(verbed),
								tag1,
								$elm$html$Html$text(' and '),
								tag2,
								$elm$html$Html$text('.')
							]));
				} else {
					var lastTag = _v0.a;
					var otherTags = _v0.b;
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$text(verbed),
							_Utils_ap(
								A2(
									$elm$core$List$intersperse,
									$elm$html$Html$text(', '),
									$elm$core$List$reverse(otherTags)),
								_List_fromArray(
									[
										$elm$html$Html$text(', and '),
										lastTag,
										$elm$html$Html$text('.')
									]))));
				}
			}
		}
	});
var $elm$browser$Debugger$Overlay$viewChange = function (change) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin', '8px 0')
			]),
		function () {
			if (change.$ === 'AliasChange') {
				var name = change.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								$elm$browser$Debugger$Overlay$viewCode(name)
							]))
					]);
			} else {
				var name = change.a;
				var removed = change.b.removed;
				var changed = change.b.changed;
				var added = change.b.added;
				var argsMatch = change.b.argsMatch;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								$elm$browser$Debugger$Overlay$viewCode(name)
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style-type', 'disc'),
								A2($elm$html$Html$Attributes$style, 'padding-left', '2em')
							]),
						_List_fromArray(
							[
								A2($elm$browser$Debugger$Overlay$viewMention, removed, 'Removed '),
								A2($elm$browser$Debugger$Overlay$viewMention, changed, 'Changed '),
								A2($elm$browser$Debugger$Overlay$viewMention, added, 'Added ')
							])),
						argsMatch ? $elm$html$Html$text('') : $elm$html$Html$text('This may be due to the fact that the type variable names changed.')
					]);
			}
		}());
};
var $elm$browser$Debugger$Overlay$viewReport = F2(
	function (isBad, report) {
		switch (report.$) {
			case 'CorruptHistory':
				return _List_fromArray(
					[
						$elm$html$Html$text('Looks like this history file is corrupt. I cannot understand it.')
					]);
			case 'VersionChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						$elm$html$Html$text('This history was created with Elm ' + (old + (', but you are using Elm ' + (_new + ' right now.'))))
					]);
			case 'MessageChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						$elm$html$Html$text('To import some other history, the overall message type must' + ' be the same. The old history has '),
						$elm$browser$Debugger$Overlay$viewCode(old),
						$elm$html$Html$text(' messages, but the new program works with '),
						$elm$browser$Debugger$Overlay$viewCode(_new),
						$elm$html$Html$text(' messages.')
					]);
			default:
				var changes = report.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								isBad ? $elm$browser$Debugger$Overlay$explanationBad : $elm$browser$Debugger$Overlay$explanationRisky)
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style-type', 'none'),
								A2($elm$html$Html$Attributes$style, 'padding-left', '20px')
							]),
						A2($elm$core$List$map, $elm$browser$Debugger$Overlay$viewChange, changes))
					]);
		}
	});
var $elm$browser$Debugger$Overlay$view = F5(
	function (config, isPaused, isOpen, numMsgs, state) {
		switch (state.$) {
			case 'None':
				return isOpen ? $elm$html$Html$text('') : (isPaused ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('elm-debugger-overlay'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'top', '0'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							A2($elm$html$Html$Attributes$style, 'width', '100vw'),
							A2($elm$html$Html$Attributes$style, 'height', '100vh'),
							A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
							A2($elm$html$Html$Attributes$style, 'z-index', '2147483646'),
							$elm$html$Html$Events$onClick(config.resume)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '80px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Click to Resume')
								])),
							A2($elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs)
						])) : A2($elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs));
			case 'BadMetadata':
				var badMetadata_ = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot use Import or Export',
					$elm$browser$Debugger$Overlay$viewBadMetadata(badMetadata_),
					$elm$browser$Debugger$Overlay$Accept('Ok'));
			case 'BadImport':
				var report = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot Import History',
					A2($elm$browser$Debugger$Overlay$viewReport, true, report),
					$elm$browser$Debugger$Overlay$Accept('Ok'));
			default:
				var report = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Warning',
					A2($elm$browser$Debugger$Overlay$viewReport, false, report),
					A2($elm$browser$Debugger$Overlay$Choose, 'Cancel', 'Import Anyway'));
		}
	});
var $elm$browser$Debugger$Main$cornerView = function (model) {
	return A5(
		$elm$browser$Debugger$Overlay$view,
		{exportHistory: $elm$browser$Debugger$Main$Export, importHistory: $elm$browser$Debugger$Main$Import, open: $elm$browser$Debugger$Main$Open, resume: $elm$browser$Debugger$Main$Resume, wrap: $elm$browser$Debugger$Main$OverlayMsg},
		$elm$browser$Debugger$Main$isPaused(model.state),
		_Debugger_isOpen(model.popout),
		$elm$browser$Debugger$History$size(model.history),
		model.overlay);
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$foldr = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$elm$core$Dict$foldr,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $elm$browser$Debugger$Main$getCurrentModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.b;
		return model;
	}
};
var $elm$browser$Debugger$Main$getUserModel = function (model) {
	return $elm$browser$Debugger$Main$getCurrentModel(model.state);
};
var $elm$browser$Debugger$Main$initialWindowHeight = 420;
var $elm$browser$Debugger$Main$initialWindowWidth = 900;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$browser$Debugger$Main$cachedHistory = function (model) {
	var _v0 = model.state;
	if (_v0.$ === 'Running') {
		return model.history;
	} else {
		var history = _v0.e;
		return history;
	}
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$browser$Debugger$Main$DragEnd = {$: 'DragEnd'};
var $elm$browser$Debugger$Main$getDragStatus = function (layout) {
	if (layout.$ === 'Horizontal') {
		var status = layout.a;
		return status;
	} else {
		var status = layout.a;
		return status;
	}
};
var $elm$browser$Debugger$Main$Drag = function (a) {
	return {$: 'Drag', a: a};
};
var $elm$browser$Debugger$Main$DragInfo = F5(
	function (x, y, down, width, height) {
		return {down: down, height: height, width: width, x: x, y: y};
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$browser$Debugger$Main$decodeDimension = function (field) {
	return A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['currentTarget', 'ownerDocument', 'defaultView', field]),
		$elm$json$Json$Decode$float);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$browser$Debugger$Main$onMouseMove = A2(
	$elm$html$Html$Events$on,
	'mousemove',
	A2(
		$elm$json$Json$Decode$map,
		$elm$browser$Debugger$Main$Drag,
		A6(
			$elm$json$Json$Decode$map5,
			$elm$browser$Debugger$Main$DragInfo,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
			A2(
				$elm$json$Json$Decode$field,
				'buttons',
				A2(
					$elm$json$Json$Decode$map,
					function (v) {
						return v === 1;
					},
					$elm$json$Json$Decode$int)),
			$elm$browser$Debugger$Main$decodeDimension('innerWidth'),
			$elm$browser$Debugger$Main$decodeDimension('innerHeight'))));
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$browser$Debugger$Main$toDragListeners = function (layout) {
	var _v0 = $elm$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				$elm$browser$Debugger$Main$onMouseMove,
				$elm$html$Html$Events$onMouseUp($elm$browser$Debugger$Main$DragEnd)
			]);
	}
};
var $elm$browser$Debugger$Main$toFlexDirection = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'row';
	} else {
		return 'column-reverse';
	}
};
var $elm$browser$Debugger$Main$DragStart = {$: 'DragStart'};
var $elm$html$Html$Events$onMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$browser$Debugger$Main$toPercent = function (fraction) {
	return $elm$core$String$fromFloat(100 * fraction) + '%';
};
var $elm$browser$Debugger$Main$viewDragZone = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$elm$browser$Debugger$Main$toPercent(x)),
					A2($elm$html$Html$Attributes$style, 'margin-left', '-5px'),
					A2($elm$html$Html$Attributes$style, 'width', '10px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'col-resize'),
					$elm$html$Html$Events$onMouseDown($elm$browser$Debugger$Main$DragStart)
				]),
			_List_Nil);
	} else {
		var y = layout.c;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$browser$Debugger$Main$toPercent(y)),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'margin-top', '-5px'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '10px'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'row-resize'),
					$elm$html$Html$Events$onMouseDown($elm$browser$Debugger$Main$DragStart)
				]),
			_List_Nil);
	}
};
var $elm$browser$Debugger$Main$TweakExpandoModel = function (a) {
	return {$: 'TweakExpandoModel', a: a};
};
var $elm$browser$Debugger$Main$TweakExpandoMsg = function (a) {
	return {$: 'TweakExpandoMsg', a: a};
};
var $elm$browser$Debugger$Main$toExpandoPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return _Utils_Tuple2(
			$elm$browser$Debugger$Main$toPercent(1 - x),
			'100%');
	} else {
		var y = layout.c;
		return _Utils_Tuple2(
			'100%',
			$elm$browser$Debugger$Main$toPercent(y));
	}
};
var $elm$browser$Debugger$Main$toMouseBlocker = function (layout) {
	var _v0 = $elm$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return 'auto';
	} else {
		return 'none';
	}
};
var $elm$browser$Debugger$Expando$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$browser$Debugger$Expando$Index = F3(
	function (a, b, c) {
		return {$: 'Index', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$Key = {$: 'Key'};
var $elm$browser$Debugger$Expando$None = {$: 'None'};
var $elm$browser$Debugger$Expando$Toggle = {$: 'Toggle'};
var $elm$browser$Debugger$Expando$Value = {$: 'Value'};
var $elm$browser$Debugger$Expando$blue = A2($elm$html$Html$Attributes$style, 'color', 'rgb(28, 0, 207)');
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Debugger$Expando$leftPad = function (maybeKey) {
	if (maybeKey.$ === 'Nothing') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding-left', '4ch')
			]);
	}
};
var $elm$browser$Debugger$Expando$makeArrow = function (arrow) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'color', '#777'),
				A2($elm$html$Html$Attributes$style, 'padding-left', '2ch'),
				A2($elm$html$Html$Attributes$style, 'width', '2ch'),
				A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(arrow)
			]));
};
var $elm$browser$Debugger$Expando$purple = A2($elm$html$Html$Attributes$style, 'color', 'rgb(136, 19, 145)');
var $elm$browser$Debugger$Expando$lineStarter = F3(
	function (maybeKey, maybeIsClosed, description) {
		var arrow = function () {
			if (maybeIsClosed.$ === 'Nothing') {
				return $elm$browser$Debugger$Expando$makeArrow('');
			} else {
				if (maybeIsClosed.a) {
					return $elm$browser$Debugger$Expando$makeArrow('▸');
				} else {
					return $elm$browser$Debugger$Expando$makeArrow('▾');
				}
			}
		}();
		if (maybeKey.$ === 'Nothing') {
			return A2($elm$core$List$cons, arrow, description);
		} else {
			var key = maybeKey.a;
			return A2(
				$elm$core$List$cons,
				arrow,
				A2(
					$elm$core$List$cons,
					A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$purple]),
						_List_fromArray(
							[
								$elm$html$Html$text(key)
							])),
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(' = '),
						description)));
		}
	});
var $elm$browser$Debugger$Expando$red = A2($elm$html$Html$Attributes$style, 'color', 'rgb(196, 26, 22)');
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$browser$Debugger$Expando$seqTypeToString = F2(
	function (n, seqType) {
		switch (seqType.$) {
			case 'ListSeq':
				return 'List(' + ($elm$core$String$fromInt(n) + ')');
			case 'SetSeq':
				return 'Set(' + ($elm$core$String$fromInt(n) + ')');
			default:
				return 'Array(' + ($elm$core$String$fromInt(n) + ')');
		}
	});
var $elm$core$String$slice = _String_slice;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $elm$browser$Debugger$Expando$elideMiddle = function (str) {
	return ($elm$core$String$length(str) <= 18) ? str : (A2($elm$core$String$left, 8, str) + ('...' + A2($elm$core$String$right, 8, str)));
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$browser$Debugger$Expando$viewExtraTinyRecord = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 1,
				_List_fromArray(
					[
						$elm$html$Html$text('}')
					]));
		} else {
			var field = entries.a;
			var rest = entries.b;
			var nextLength = (length + $elm$core$String$length(field)) + 1;
			if (nextLength > 18) {
				return _Utils_Tuple2(
					length + 2,
					_List_fromArray(
						[
							$elm$html$Html$text('…}')
						]));
			} else {
				var _v1 = A3($elm$browser$Debugger$Expando$viewExtraTinyRecord, nextLength, ',', rest);
				var finalLength = _v1.a;
				var otherHtmls = _v1.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(starter),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										$elm$html$Html$text(field)
									])),
							otherHtmls)));
			}
		}
	});
var $elm$browser$Debugger$Expando$viewTinyHelp = function (str) {
	return _Utils_Tuple2(
		$elm$core$String$length(str),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$browser$Debugger$Expando$viewExtraTiny = function (value) {
	if (value.$ === 'Record') {
		var record = value.b;
		return A3(
			$elm$browser$Debugger$Expando$viewExtraTinyRecord,
			0,
			'{',
			$elm$core$Dict$keys(record));
	} else {
		return $elm$browser$Debugger$Expando$viewTiny(value);
	}
};
var $elm$browser$Debugger$Expando$viewTiny = function (value) {
	switch (value.$) {
		case 'S':
			var stringRep = value.a;
			var str = $elm$browser$Debugger$Expando$elideMiddle(stringRep);
			return _Utils_Tuple2(
				$elm$core$String$length(str),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$red]),
						_List_fromArray(
							[
								$elm$html$Html$text(str)
							]))
					]));
		case 'Primitive':
			var stringRep = value.a;
			return _Utils_Tuple2(
				$elm$core$String$length(stringRep),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$blue]),
						_List_fromArray(
							[
								$elm$html$Html$text(stringRep)
							]))
					]));
		case 'Sequence':
			var seqType = value.a;
			var valueList = value.c;
			return $elm$browser$Debugger$Expando$viewTinyHelp(
				A2(
					$elm$browser$Debugger$Expando$seqTypeToString,
					$elm$core$List$length(valueList),
					seqType));
		case 'Dictionary':
			var keyValuePairs = value.b;
			return $elm$browser$Debugger$Expando$viewTinyHelp(
				'Dict(' + ($elm$core$String$fromInt(
					$elm$core$List$length(keyValuePairs)) + ')'));
		case 'Record':
			var record = value.b;
			return $elm$browser$Debugger$Expando$viewTinyRecord(record);
		default:
			if (!value.c.b) {
				var maybeName = value.a;
				return $elm$browser$Debugger$Expando$viewTinyHelp(
					A2($elm$core$Maybe$withDefault, 'Unit', maybeName));
			} else {
				var maybeName = value.a;
				var valueList = value.c;
				return $elm$browser$Debugger$Expando$viewTinyHelp(
					function () {
						if (maybeName.$ === 'Nothing') {
							return 'Tuple(' + ($elm$core$String$fromInt(
								$elm$core$List$length(valueList)) + ')');
						} else {
							var name = maybeName.a;
							return name + ' …';
						}
					}());
			}
	}
};
var $elm$browser$Debugger$Expando$viewTinyRecord = function (record) {
	return $elm$core$Dict$isEmpty(record) ? _Utils_Tuple2(
		2,
		_List_fromArray(
			[
				$elm$html$Html$text('{}')
			])) : A3(
		$elm$browser$Debugger$Expando$viewTinyRecordHelp,
		0,
		'{ ',
		$elm$core$Dict$toList(record));
};
var $elm$browser$Debugger$Expando$viewTinyRecordHelp = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 2,
				_List_fromArray(
					[
						$elm$html$Html$text(' }')
					]));
		} else {
			var _v1 = entries.a;
			var field = _v1.a;
			var value = _v1.b;
			var rest = entries.b;
			var fieldLen = $elm$core$String$length(field);
			var _v2 = $elm$browser$Debugger$Expando$viewExtraTiny(value);
			var valueLen = _v2.a;
			var valueHtmls = _v2.b;
			var newLength = ((length + fieldLen) + valueLen) + 5;
			if (newLength > 60) {
				return _Utils_Tuple2(
					length + 4,
					_List_fromArray(
						[
							$elm$html$Html$text(', … }')
						]));
			} else {
				var _v3 = A3($elm$browser$Debugger$Expando$viewTinyRecordHelp, newLength, ', ', rest);
				var finalLength = _v3.a;
				var otherHtmls = _v3.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(starter),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										$elm$html$Html$text(field)
									])),
							A2(
								$elm$core$List$cons,
								$elm$html$Html$text(' = '),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$span, _List_Nil, valueHtmls),
									otherHtmls)))));
			}
		}
	});
var $elm$browser$Debugger$Expando$view = F2(
	function (maybeKey, expando) {
		switch (expando.$) {
			case 'S':
				var stringRep = expando.a;
				return A2(
					$elm$html$Html$div,
					$elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$red]),
								_List_fromArray(
									[
										$elm$html$Html$text(stringRep)
									]))
							])));
			case 'Primitive':
				var stringRep = expando.a;
				return A2(
					$elm$html$Html$div,
					$elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$blue]),
								_List_fromArray(
									[
										$elm$html$Html$text(stringRep)
									]))
							])));
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4($elm$browser$Debugger$Expando$viewSequence, maybeKey, seqType, isClosed, valueList);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return A3($elm$browser$Debugger$Expando$viewDictionary, maybeKey, isClosed, keyValuePairs);
			case 'Record':
				var isClosed = expando.a;
				var valueDict = expando.b;
				return A3($elm$browser$Debugger$Expando$viewRecord, maybeKey, isClosed, valueDict);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4($elm$browser$Debugger$Expando$viewConstructor, maybeKey, maybeName, isClosed, valueList);
		}
	});
var $elm$browser$Debugger$Expando$viewConstructor = F4(
	function (maybeKey, maybeName, isClosed, valueList) {
		var tinyArgs = A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $elm$core$Tuple$second, $elm$browser$Debugger$Expando$viewExtraTiny),
			valueList);
		var description = function () {
			var _v7 = _Utils_Tuple2(maybeName, tinyArgs);
			if (_v7.a.$ === 'Nothing') {
				if (!_v7.b.b) {
					var _v8 = _v7.a;
					return _List_fromArray(
						[
							$elm$html$Html$text('()')
						]);
				} else {
					var _v9 = _v7.a;
					var _v10 = _v7.b;
					var x = _v10.a;
					var xs = _v10.b;
					return A2(
						$elm$core$List$cons,
						$elm$html$Html$text('( '),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$span, _List_Nil, x),
							A3(
								$elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											$elm$core$List$cons,
											$elm$html$Html$text(', '),
											A2(
												$elm$core$List$cons,
												A2($elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_fromArray(
									[
										$elm$html$Html$text(' )')
									]),
								xs)));
				}
			} else {
				if (!_v7.b.b) {
					var name = _v7.a.a;
					return _List_fromArray(
						[
							$elm$html$Html$text(name)
						]);
				} else {
					var name = _v7.a.a;
					var _v11 = _v7.b;
					var x = _v11.a;
					var xs = _v11.b;
					return A2(
						$elm$core$List$cons,
						$elm$html$Html$text(name + ' '),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$span, _List_Nil, x),
							A3(
								$elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											$elm$core$List$cons,
											$elm$html$Html$text(' '),
											A2(
												$elm$core$List$cons,
												A2($elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_Nil,
								xs)));
				}
			}
		}();
		var _v4 = function () {
			if (!valueList.b) {
				return _Utils_Tuple2(
					$elm$core$Maybe$Nothing,
					A2($elm$html$Html$div, _List_Nil, _List_Nil));
			} else {
				if (!valueList.b.b) {
					var entry = valueList.a;
					switch (entry.$) {
						case 'S':
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								A2($elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Primitive':
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								A2($elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Sequence':
							var subValueList = entry.c;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewSequenceOpen(subValueList)));
						case 'Dictionary':
							var keyValuePairs = entry.b;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)));
						case 'Record':
							var record = entry.b;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewRecordOpen(record)));
						default:
							var subValueList = entry.c;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewConstructorOpen(subValueList)));
					}
				} else {
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(isClosed),
						isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : $elm$browser$Debugger$Expando$viewConstructorOpen(valueList));
				}
			}
		}();
		var maybeIsClosed = _v4.a;
		var openHtml = _v4.b;
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3($elm$browser$Debugger$Expando$lineStarter, maybeKey, maybeIsClosed, description)),
					openHtml
				]));
	});
var $elm$browser$Debugger$Expando$viewConstructorEntry = F2(
	function (index, value) {
		return A2(
			$elm$html$Html$map,
			A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, index),
			A2(
				$elm$browser$Debugger$Expando$view,
				$elm$core$Maybe$Just(
					$elm$core$String$fromInt(index)),
				value));
	});
var $elm$browser$Debugger$Expando$viewConstructorOpen = function (valueList) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewConstructorEntry, valueList));
};
var $elm$browser$Debugger$Expando$viewDictionary = F3(
	function (maybeKey, isClosed, keyValuePairs) {
		var starter = 'Dict(' + ($elm$core$String$fromInt(
			$elm$core$List$length(keyValuePairs)) + ')');
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								$elm$html$Html$text(starter)
							]))),
					isClosed ? $elm$html$Html$text('') : $elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)
				]));
	});
var $elm$browser$Debugger$Expando$viewDictionaryEntry = F2(
	function (index, _v2) {
		var key = _v2.a;
		var value = _v2.b;
		switch (key.$) {
			case 'S':
				var stringRep = key.a;
				return A2(
					$elm$html$Html$map,
					A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
					A2(
						$elm$browser$Debugger$Expando$view,
						$elm$core$Maybe$Just(stringRep),
						value));
			case 'Primitive':
				var stringRep = key.a;
				return A2(
					$elm$html$Html$map,
					A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
					A2(
						$elm$browser$Debugger$Expando$view,
						$elm$core$Maybe$Just(stringRep),
						value));
			default:
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Key, index),
							A2(
								$elm$browser$Debugger$Expando$view,
								$elm$core$Maybe$Just('key'),
								key)),
							A2(
							$elm$html$Html$map,
							A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
							A2(
								$elm$browser$Debugger$Expando$view,
								$elm$core$Maybe$Just('value'),
								value))
						]));
		}
	});
var $elm$browser$Debugger$Expando$viewDictionaryOpen = function (keyValuePairs) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewDictionaryEntry, keyValuePairs));
};
var $elm$browser$Debugger$Expando$viewRecord = F3(
	function (maybeKey, isClosed, record) {
		var _v1 = isClosed ? _Utils_Tuple3(
			$elm$browser$Debugger$Expando$viewTinyRecord(record).b,
			$elm$html$Html$text(''),
			$elm$html$Html$text('')) : _Utils_Tuple3(
			_List_fromArray(
				[
					$elm$html$Html$text('{')
				]),
			$elm$browser$Debugger$Expando$viewRecordOpen(record),
			A2(
				$elm$html$Html$div,
				$elm$browser$Debugger$Expando$leftPad(
					$elm$core$Maybe$Just(_Utils_Tuple0)),
				_List_fromArray(
					[
						$elm$html$Html$text('}')
					])));
		var start = _v1.a;
		var middle = _v1.b;
		var end = _v1.c;
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						start)),
					middle,
					end
				]));
	});
var $elm$browser$Debugger$Expando$viewRecordEntry = function (_v0) {
	var field = _v0.a;
	var value = _v0.b;
	return A2(
		$elm$html$Html$map,
		$elm$browser$Debugger$Expando$Field(field),
		A2(
			$elm$browser$Debugger$Expando$view,
			$elm$core$Maybe$Just(field),
			value));
};
var $elm$browser$Debugger$Expando$viewRecordOpen = function (record) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2(
			$elm$core$List$map,
			$elm$browser$Debugger$Expando$viewRecordEntry,
			$elm$core$Dict$toList(record)));
};
var $elm$browser$Debugger$Expando$viewSequence = F4(
	function (maybeKey, seqType, isClosed, valueList) {
		var starter = A2(
			$elm$browser$Debugger$Expando$seqTypeToString,
			$elm$core$List$length(valueList),
			seqType);
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								$elm$html$Html$text(starter)
							]))),
					isClosed ? $elm$html$Html$text('') : $elm$browser$Debugger$Expando$viewSequenceOpen(valueList)
				]));
	});
var $elm$browser$Debugger$Expando$viewSequenceOpen = function (values) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewConstructorEntry, values));
};
var $elm$browser$Debugger$Main$viewExpando = F3(
	function (expandoMsg, expandoModel, layout) {
		var block = $elm$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $elm$browser$Debugger$Main$toExpandoPercents(layout);
		var w = _v0.a;
		var h = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'block'),
					A2($elm$html$Html$Attributes$style, 'width', 'calc(' + (w + ' - 4em)')),
					A2($elm$html$Html$Attributes$style, 'height', 'calc(' + (h + ' - 4em)')),
					A2($elm$html$Html$Attributes$style, 'padding', '2em'),
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'auto'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', block),
					A2($elm$html$Html$Attributes$style, '-webkit-user-select', block),
					A2($elm$html$Html$Attributes$style, '-moz-user-select', block),
					A2($elm$html$Html$Attributes$style, '-ms-user-select', block),
					A2($elm$html$Html$Attributes$style, 'user-select', block)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', '#ccc'),
							A2($elm$html$Html$Attributes$style, 'padding', '0 0 1em 0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('-- MESSAGE')
						])),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$TweakExpandoMsg,
					A2($elm$browser$Debugger$Expando$view, $elm$core$Maybe$Nothing, expandoMsg)),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', '#ccc'),
							A2($elm$html$Html$Attributes$style, 'padding', '1em 0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('-- MODEL')
						])),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$TweakExpandoModel,
					A2($elm$browser$Debugger$Expando$view, $elm$core$Maybe$Nothing, expandoModel))
				]));
	});
var $elm$browser$Debugger$Main$Jump = function (a) {
	return {$: 'Jump', a: a};
};
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$html$Html$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$browser$Debugger$Main$toHistoryPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return _Utils_Tuple2(
			$elm$browser$Debugger$Main$toPercent(x),
			'100%');
	} else {
		var y = layout.c;
		return _Utils_Tuple2(
			'100%',
			$elm$browser$Debugger$Main$toPercent(1 - y));
	}
};
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$browser$Debugger$History$idForMessageIndex = function (index) {
	return 'msg-' + $elm$core$String$fromInt(index);
};
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$browser$Debugger$History$viewMessage = F3(
	function (currentIndex, index, msg) {
		var messageName = _Debugger_messageToString(msg);
		var className = _Utils_eq(currentIndex, index) ? 'elm-debugger-entry elm-debugger-entry-selected' : 'elm-debugger-entry';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id(
					$elm$browser$Debugger$History$idForMessageIndex(index)),
					$elm$html$Html$Attributes$class(className),
					$elm$html$Html$Events$onClick(index)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$title(messageName),
							$elm$html$Html$Attributes$class('elm-debugger-entry-content')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(messageName)
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('elm-debugger-entry-index')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(index))
						]))
				]));
	});
var $elm$browser$Debugger$History$consMsg = F3(
	function (currentIndex, msg, _v0) {
		var index = _v0.a;
		var rest = _v0.b;
		return _Utils_Tuple2(
			index + 1,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$elm$core$String$fromInt(index),
					A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewMessage, currentIndex, index, msg)),
				rest));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm$browser$Debugger$History$maxSnapshotSize = 31;
var $elm$browser$Debugger$History$showMoreButton = function (numMessages) {
	var nextIndex = (numMessages - 1) - ($elm$browser$Debugger$History$maxSnapshotSize * 2);
	var labelText = 'View more messages';
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-debugger-entry'),
				$elm$html$Html$Events$onClick(nextIndex)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$title(labelText),
						$elm$html$Html$Attributes$class('elm-debugger-entry-content')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(labelText)
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elm-debugger-entry-index')
					]),
				_List_Nil)
			]));
};
var $elm$browser$Debugger$History$styles = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('\n\n.elm-debugger-entry {\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n}\n\n.elm-debugger-entry:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.elm-debugger-entry-selected, .elm-debugger-entry-selected:hover {\n  background-color: rgb(10, 10, 10);\n}\n\n.elm-debugger-entry-content {\n  width: calc(100% - 40px);\n  padding: 0 5px;\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.elm-debugger-entry-index {\n  color: #666;\n  width: 40px;\n  text-align: right;\n  display: block;\n  float: right;\n}\n\n')
		]));
var $elm$core$Basics$ge = _Utils_ge;
var $elm$browser$Debugger$History$viewSnapshot = F3(
	function (selectedIndex, index, _v0) {
		var messages = _v0.messages;
		return A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_Nil,
			A3(
				$elm$core$Array$foldr,
				$elm$browser$Debugger$History$consMsg(selectedIndex),
				_Utils_Tuple2(index, _List_Nil),
				messages).b);
	});
var $elm$browser$Debugger$History$consSnapshot = F3(
	function (selectedIndex, snapshot, _v0) {
		var index = _v0.a;
		var rest = _v0.b;
		var nextIndex = index + $elm$core$Array$length(snapshot.messages);
		var selectedIndexHelp = ((_Utils_cmp(nextIndex, selectedIndex) > 0) && (_Utils_cmp(selectedIndex, index) > -1)) ? selectedIndex : (-1);
		return _Utils_Tuple2(
			nextIndex,
			A2(
				$elm$core$List$cons,
				A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewSnapshot, selectedIndexHelp, index, snapshot),
				rest));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$browser$Debugger$History$viewAllSnapshots = F3(
	function (selectedIndex, startIndex, snapshots) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			A3(
				$elm$core$Array$foldl,
				$elm$browser$Debugger$History$consSnapshot(selectedIndex),
				_Utils_Tuple2(startIndex, _List_Nil),
				snapshots).b);
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $elm$browser$Debugger$History$viewRecentSnapshots = F3(
	function (selectedIndex, recentMessagesNum, snapshots) {
		var messagesToFill = $elm$browser$Debugger$History$maxSnapshotSize - recentMessagesNum;
		var arrayLength = $elm$core$Array$length(snapshots);
		var snapshotsToRender = function () {
			var _v0 = _Utils_Tuple2(
				A2($elm$core$Array$get, arrayLength - 2, snapshots),
				A2($elm$core$Array$get, arrayLength - 1, snapshots));
			if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
				var fillerSnapshot = _v0.a.a;
				var recentSnapshot = _v0.b.a;
				return $elm$core$Array$fromList(
					_List_fromArray(
						[
							{
							messages: A3($elm$core$Array$slice, 0, messagesToFill, fillerSnapshot.messages),
							model: fillerSnapshot.model
						},
							recentSnapshot
						]));
			} else {
				return snapshots;
			}
		}();
		var startingIndex = ((arrayLength * $elm$browser$Debugger$History$maxSnapshotSize) - $elm$browser$Debugger$History$maxSnapshotSize) - messagesToFill;
		return A3($elm$browser$Debugger$History$viewAllSnapshots, selectedIndex, startingIndex, snapshotsToRender);
	});
var $elm$browser$Debugger$History$view = F2(
	function (maybeIndex, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var recentMessageStartIndex = numMessages - recent.numMessages;
		var index = A2($elm$core$Maybe$withDefault, -1, maybeIndex);
		var newStuff = A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_Nil,
			A3(
				$elm$core$List$foldr,
				$elm$browser$Debugger$History$consMsg(index),
				_Utils_Tuple2(recentMessageStartIndex, _List_Nil),
				recent.messages).b);
		var onlyRenderRecentMessages = (!_Utils_eq(index, -1)) || ($elm$core$Array$length(snapshots) < 2);
		var oldStuff = onlyRenderRecentMessages ? A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewAllSnapshots, index, 0, snapshots) : A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewRecentSnapshots, index, recent.numMessages, snapshots);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('elm-debugger-sidebar'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
					A2($elm$html$Html$Attributes$style, 'height', 'calc(100% - 72px)')
				]),
			A2(
				$elm$core$List$cons,
				$elm$browser$Debugger$History$styles,
				A2(
					$elm$core$List$cons,
					newStuff,
					A2(
						$elm$core$List$cons,
						oldStuff,
						onlyRenderRecentMessages ? _List_Nil : _List_fromArray(
							[
								$elm$browser$Debugger$History$showMoreButton(numMessages)
							])))));
	});
var $elm$browser$Debugger$Main$SwapLayout = {$: 'SwapLayout'};
var $elm$browser$Debugger$Main$toHistoryIcon = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M13 3h-10a1 1 0 0 0-1 1v5h12v-5a1 1 0 0 0-1-1z M14 10h-12v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z';
	} else {
		return 'M0 4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3z M2 4v8a1 1 0 0 0 1 1h2v-10h-2a1 1 0 0 0-1 1z M6 3v10h7a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1z';
	}
};
var $elm$browser$Debugger$Main$icon = function (path) {
	return A4(
		$elm$virtual_dom$VirtualDom$nodeNS,
		'http://www.w3.org/2000/svg',
		'svg',
		_List_fromArray(
			[
				A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 16 16'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'fill', 'currentColor'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'width', '16px'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'height', '16px')
			]),
		_List_fromArray(
			[
				A4(
				$elm$virtual_dom$VirtualDom$nodeNS,
				'http://www.w3.org/2000/svg',
				'path',
				_List_fromArray(
					[
						A2($elm$virtual_dom$VirtualDom$attribute, 'd', path)
					]),
				_List_Nil)
			]));
};
var $elm$browser$Debugger$Main$viewHistoryButton = F3(
	function (label, msg, path) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'background', 'none'),
					A2($elm$html$Html$Attributes$style, 'border', 'none'),
					A2($elm$html$Html$Attributes$style, 'color', 'inherit'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(msg)
				]),
			_List_fromArray(
				[
					$elm$browser$Debugger$Main$icon(path),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', '6px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $elm$browser$Debugger$Main$viewHistoryOptions = function (layout) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '36px'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		_List_fromArray(
			[
				A3(
				$elm$browser$Debugger$Main$viewHistoryButton,
				'Swap Layout',
				$elm$browser$Debugger$Main$SwapLayout,
				$elm$browser$Debugger$Main$toHistoryIcon(layout)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between')
					]),
				_List_fromArray(
					[
						A3($elm$browser$Debugger$Main$viewHistoryButton, 'Import', $elm$browser$Debugger$Main$Import, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M10 2a1 1 0 0 0 -2 0v6a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2h-3.586l4.293-4.293a1 1 0 0 0-1.414-1.414l-4.293 4.293z'),
						A3($elm$browser$Debugger$Main$viewHistoryButton, 'Export', $elm$browser$Debugger$Main$Export, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1 a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M9 3a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-3.586l-5.293 5.293 a1 1 0 0 1-1.414-1.414l5.293 -5.293z')
					]))
			]));
};
var $elm$browser$Debugger$Main$SliderJump = function (a) {
	return {$: 'SliderJump', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$browser$Debugger$Main$isPlaying = function (maybeIndex) {
	if (maybeIndex.$ === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$core$String$toInt = _String_toInt;
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$browser$Debugger$Main$viewPlayButton = function (playing) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', '#1293D8'),
				A2($elm$html$Html$Attributes$style, 'border', 'none'),
				A2($elm$html$Html$Attributes$style, 'color', 'white'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
				A2($elm$html$Html$Attributes$style, 'width', '36px'),
				A2($elm$html$Html$Attributes$style, 'height', '36px'),
				$elm$html$Html$Events$onClick($elm$browser$Debugger$Main$Resume)
			]),
		_List_fromArray(
			[
				playing ? $elm$browser$Debugger$Main$icon('M2 2h4v12h-4v-12z M10 2h4v12h-4v-12z') : $elm$browser$Debugger$Main$icon('M2 2l12 7l-12 7z')
			]));
};
var $elm$browser$Debugger$Main$viewHistorySlider = F2(
	function (history, maybeIndex) {
		var lastIndex = $elm$browser$Debugger$History$size(history) - 1;
		var selectedIndex = A2($elm$core$Maybe$withDefault, lastIndex, maybeIndex);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '36px'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Lazy$lazy,
					$elm$browser$Debugger$Main$viewPlayButton,
					$elm$browser$Debugger$Main$isPlaying(maybeIndex)),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('range'),
							A2($elm$html$Html$Attributes$style, 'width', 'calc(100% - 56px)'),
							A2($elm$html$Html$Attributes$style, 'height', '36px'),
							A2($elm$html$Html$Attributes$style, 'margin', '0 10px'),
							$elm$html$Html$Attributes$min('0'),
							$elm$html$Html$Attributes$max(
							$elm$core$String$fromInt(lastIndex)),
							$elm$html$Html$Attributes$value(
							$elm$core$String$fromInt(selectedIndex)),
							$elm$html$Html$Events$onInput(
							A2(
								$elm$core$Basics$composeR,
								$elm$core$String$toInt,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Maybe$withDefault(lastIndex),
									$elm$browser$Debugger$Main$SliderJump)))
						]),
					_List_Nil)
				]));
	});
var $elm$browser$Debugger$Main$viewHistory = F3(
	function (maybeIndex, history, layout) {
		var block = $elm$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $elm$browser$Debugger$Main$toHistoryPercents(layout);
		var w = _v0.a;
		var h = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', w),
					A2($elm$html$Html$Attributes$style, 'height', h),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'color', '#DDDDDD'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', block),
					A2($elm$html$Html$Attributes$style, 'user-select', block)
				]),
			_List_fromArray(
				[
					A2($elm$browser$Debugger$Main$viewHistorySlider, history, maybeIndex),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$Jump,
					A2($elm$browser$Debugger$History$view, maybeIndex, history)),
					A2($elm$html$Html$Lazy$lazy, $elm$browser$Debugger$Main$viewHistoryOptions, layout)
				]));
	});
var $elm$browser$Debugger$Main$popoutView = function (model) {
	var maybeIndex = function () {
		var _v0 = model.state;
		if (_v0.$ === 'Running') {
			return $elm$core$Maybe$Nothing;
		} else {
			var index = _v0.a;
			return $elm$core$Maybe$Just(index);
		}
	}();
	var historyToRender = $elm$browser$Debugger$Main$cachedHistory(model);
	return A3(
		$elm$html$Html$node,
		'body',
		_Utils_ap(
			$elm$browser$Debugger$Main$toDragListeners(model.layout),
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'padding', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2(
					$elm$html$Html$Attributes$style,
					'flex-direction',
					$elm$browser$Debugger$Main$toFlexDirection(model.layout))
				])),
		_List_fromArray(
			[
				A3($elm$browser$Debugger$Main$viewHistory, maybeIndex, historyToRender, model.layout),
				$elm$browser$Debugger$Main$viewDragZone(model.layout),
				A3($elm$browser$Debugger$Main$viewExpando, model.expandoMsg, model.expandoModel, model.layout)
			]));
};
var $elm$browser$Debugger$Overlay$BlockAll = {$: 'BlockAll'};
var $elm$browser$Debugger$Overlay$toBlockerType = F2(
	function (isPaused, state) {
		switch (state.$) {
			case 'None':
				return isPaused ? $elm$browser$Debugger$Overlay$BlockAll : $elm$browser$Debugger$Overlay$BlockNone;
			case 'BadMetadata':
				return $elm$browser$Debugger$Overlay$BlockMost;
			case 'BadImport':
				return $elm$browser$Debugger$Overlay$BlockMost;
			default:
				return $elm$browser$Debugger$Overlay$BlockMost;
		}
	});
var $elm$browser$Debugger$Main$toBlockerType = function (model) {
	return A2(
		$elm$browser$Debugger$Overlay$toBlockerType,
		$elm$browser$Debugger$Main$isPaused(model.state),
		model.overlay);
};
var $elm$browser$Debugger$Main$Horizontal = F3(
	function (a, b, c) {
		return {$: 'Horizontal', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Main$Running = function (a) {
	return {$: 'Running', a: a};
};
var $elm$browser$Debugger$Main$Static = {$: 'Static'};
var $elm$browser$Debugger$Metadata$Error = F2(
	function (message, problems) {
		return {message: message, problems: problems};
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$browser$Debugger$Metadata$Metadata = F2(
	function (versions, types) {
		return {types: types, versions: versions};
	});
var $elm$browser$Debugger$Metadata$Types = F3(
	function (message, aliases, unions) {
		return {aliases: aliases, message: message, unions: unions};
	});
var $elm$browser$Debugger$Metadata$Alias = F2(
	function (args, tipe) {
		return {args: args, tipe: tipe};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$browser$Debugger$Metadata$decodeAlias = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Alias,
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $elm$browser$Debugger$Metadata$Union = F2(
	function (args, tags) {
		return {args: args, tags: tags};
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$browser$Debugger$Metadata$decodeUnion = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Union,
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'tags',
		$elm$json$Json$Decode$dict(
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$browser$Debugger$Metadata$decodeTypes = A4(
	$elm$json$Json$Decode$map3,
	$elm$browser$Debugger$Metadata$Types,
	A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'aliases',
		$elm$json$Json$Decode$dict($elm$browser$Debugger$Metadata$decodeAlias)),
	A2(
		$elm$json$Json$Decode$field,
		'unions',
		$elm$json$Json$Decode$dict($elm$browser$Debugger$Metadata$decodeUnion)));
var $elm$browser$Debugger$Metadata$Versions = function (elm) {
	return {elm: elm};
};
var $elm$browser$Debugger$Metadata$decodeVersions = A2(
	$elm$json$Json$Decode$map,
	$elm$browser$Debugger$Metadata$Versions,
	A2($elm$json$Json$Decode$field, 'elm', $elm$json$Json$Decode$string));
var $elm$browser$Debugger$Metadata$decoder = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Metadata,
	A2($elm$json$Json$Decode$field, 'versions', $elm$browser$Debugger$Metadata$decodeVersions),
	A2($elm$json$Json$Decode$field, 'types', $elm$browser$Debugger$Metadata$decodeTypes));
var $elm$browser$Debugger$Metadata$ProblemType = F2(
	function (name, problems) {
		return {name: name, problems: problems};
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$String$contains = _String_contains;
var $elm$browser$Debugger$Metadata$hasProblem = F2(
	function (tipe, _v0) {
		var problem = _v0.a;
		var token = _v0.b;
		return A2($elm$core$String$contains, token, tipe) ? $elm$core$Maybe$Just(problem) : $elm$core$Maybe$Nothing;
	});
var $elm$browser$Debugger$Metadata$Decoder = {$: 'Decoder'};
var $elm$browser$Debugger$Metadata$Function = {$: 'Function'};
var $elm$browser$Debugger$Metadata$Process = {$: 'Process'};
var $elm$browser$Debugger$Metadata$Program = {$: 'Program'};
var $elm$browser$Debugger$Metadata$Request = {$: 'Request'};
var $elm$browser$Debugger$Metadata$Socket = {$: 'Socket'};
var $elm$browser$Debugger$Metadata$Task = {$: 'Task'};
var $elm$browser$Debugger$Metadata$VirtualDom = {$: 'VirtualDom'};
var $elm$browser$Debugger$Metadata$problemTable = _List_fromArray(
	[
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Function, '->'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Decoder, 'Json.Decode.Decoder'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Task, 'Task.Task'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Process, 'Process.Id'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Socket, 'WebSocket.LowLevel.WebSocket'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Request, 'Http.Request'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Program, 'Platform.Program'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Node'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Attribute')
	]);
var $elm$browser$Debugger$Metadata$findProblems = function (tipe) {
	return A2(
		$elm$core$List$filterMap,
		$elm$browser$Debugger$Metadata$hasProblem(tipe),
		$elm$browser$Debugger$Metadata$problemTable);
};
var $elm$browser$Debugger$Metadata$collectBadAliases = F3(
	function (name, _v0, list) {
		var tipe = _v0.tipe;
		var _v1 = $elm$browser$Debugger$Metadata$findProblems(tipe);
		if (!_v1.b) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$elm$core$List$cons,
				A2($elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $elm$browser$Debugger$Metadata$collectBadUnions = F3(
	function (name, _v0, list) {
		var tags = _v0.tags;
		var _v1 = A2(
			$elm$core$List$concatMap,
			$elm$browser$Debugger$Metadata$findProblems,
			$elm$core$List$concat(
				$elm$core$Dict$values(tags)));
		if (!_v1.b) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$elm$core$List$cons,
				A2($elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$browser$Debugger$Metadata$isPortable = function (_v0) {
	var types = _v0.types;
	var badAliases = A3($elm$core$Dict$foldl, $elm$browser$Debugger$Metadata$collectBadAliases, _List_Nil, types.aliases);
	var _v1 = A3($elm$core$Dict$foldl, $elm$browser$Debugger$Metadata$collectBadUnions, badAliases, types.unions);
	if (!_v1.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var problems = _v1;
		return $elm$core$Maybe$Just(
			A2($elm$browser$Debugger$Metadata$Error, types.message, problems));
	}
};
var $elm$browser$Debugger$Metadata$decode = function (value) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $elm$browser$Debugger$Metadata$decoder, value);
	if (_v0.$ === 'Err') {
		return $elm$core$Result$Err(
			A2($elm$browser$Debugger$Metadata$Error, 'The compiler is generating bad metadata. This is a compiler bug!', _List_Nil));
	} else {
		var metadata = _v0.a;
		var _v1 = $elm$browser$Debugger$Metadata$isPortable(metadata);
		if (_v1.$ === 'Nothing') {
			return $elm$core$Result$Ok(metadata);
		} else {
			var error = _v1.a;
			return $elm$core$Result$Err(error);
		}
	}
};
var $elm$browser$Debugger$History$History = F3(
	function (snapshots, recent, numMessages) {
		return {numMessages: numMessages, recent: recent, snapshots: snapshots};
	});
var $elm$browser$Debugger$History$RecentHistory = F3(
	function (model, messages, numMessages) {
		return {messages: messages, model: model, numMessages: numMessages};
	});
var $elm$browser$Debugger$History$empty = function (model) {
	return A3(
		$elm$browser$Debugger$History$History,
		$elm$core$Array$empty,
		A3($elm$browser$Debugger$History$RecentHistory, model, _List_Nil, 0),
		0);
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$browser$Debugger$Expando$initHelp = F2(
	function (isOuter, expando) {
		switch (expando.$) {
			case 'S':
				return expando;
			case 'Primitive':
				return expando;
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var items = expando.c;
				return isOuter ? A3(
					$elm$browser$Debugger$Expando$Sequence,
					seqType,
					false,
					A2(
						$elm$core$List$map,
						$elm$browser$Debugger$Expando$initHelp(false),
						items)) : (($elm$core$List$length(items) <= 8) ? A3($elm$browser$Debugger$Expando$Sequence, seqType, false, items) : expando);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return isOuter ? A2(
					$elm$browser$Debugger$Expando$Dictionary,
					false,
					A2(
						$elm$core$List$map,
						function (_v1) {
							var k = _v1.a;
							var v = _v1.b;
							return _Utils_Tuple2(
								k,
								A2($elm$browser$Debugger$Expando$initHelp, false, v));
						},
						keyValuePairs)) : (($elm$core$List$length(keyValuePairs) <= 8) ? A2($elm$browser$Debugger$Expando$Dictionary, false, keyValuePairs) : expando);
			case 'Record':
				var isClosed = expando.a;
				var entries = expando.b;
				return isOuter ? A2(
					$elm$browser$Debugger$Expando$Record,
					false,
					A2(
						$elm$core$Dict$map,
						F2(
							function (_v2, v) {
								return A2($elm$browser$Debugger$Expando$initHelp, false, v);
							}),
						entries)) : (($elm$core$Dict$size(entries) <= 4) ? A2($elm$browser$Debugger$Expando$Record, false, entries) : expando);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var args = expando.c;
				return isOuter ? A3(
					$elm$browser$Debugger$Expando$Constructor,
					maybeName,
					false,
					A2(
						$elm$core$List$map,
						$elm$browser$Debugger$Expando$initHelp(false),
						args)) : (($elm$core$List$length(args) <= 4) ? A3($elm$browser$Debugger$Expando$Constructor, maybeName, false, args) : expando);
		}
	});
var $elm$browser$Debugger$Expando$init = function (value) {
	return A2(
		$elm$browser$Debugger$Expando$initHelp,
		true,
		_Debugger_init(value));
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$browser$Debugger$Overlay$None = {$: 'None'};
var $elm$browser$Debugger$Overlay$none = $elm$browser$Debugger$Overlay$None;
var $elm$browser$Debugger$Main$wrapInit = F4(
	function (metadata, popout, init, flags) {
		var _v0 = init(flags);
		var userModel = _v0.a;
		var userCommands = _v0.b;
		return _Utils_Tuple2(
			{
				expandoModel: $elm$browser$Debugger$Expando$init(userModel),
				expandoMsg: $elm$browser$Debugger$Expando$init(_Utils_Tuple0),
				history: $elm$browser$Debugger$History$empty(userModel),
				layout: A3($elm$browser$Debugger$Main$Horizontal, $elm$browser$Debugger$Main$Static, 0.3, 0.5),
				metadata: $elm$browser$Debugger$Metadata$decode(metadata),
				overlay: $elm$browser$Debugger$Overlay$none,
				popout: popout,
				state: $elm$browser$Debugger$Main$Running(userModel)
			},
			A2($elm$core$Platform$Cmd$map, $elm$browser$Debugger$Main$UserMsg, userCommands));
	});
var $elm$browser$Debugger$Main$getLatestModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.c;
		return model;
	}
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$browser$Debugger$Main$wrapSubs = F2(
	function (subscriptions, model) {
		return A2(
			$elm$core$Platform$Sub$map,
			$elm$browser$Debugger$Main$UserMsg,
			subscriptions(
				$elm$browser$Debugger$Main$getLatestModel(model.state)));
	});
var $elm$browser$Debugger$Main$Moving = {$: 'Moving'};
var $elm$browser$Debugger$Main$Paused = F5(
	function (a, b, c, d, e) {
		return {$: 'Paused', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$browser$Debugger$History$Snapshot = F2(
	function (model, messages) {
		return {messages: messages, model: model};
	});
var $elm$browser$Debugger$History$addRecent = F3(
	function (msg, newModel, _v0) {
		var model = _v0.model;
		var messages = _v0.messages;
		var numMessages = _v0.numMessages;
		return _Utils_eq(numMessages, $elm$browser$Debugger$History$maxSnapshotSize) ? _Utils_Tuple2(
			$elm$core$Maybe$Just(
				A2(
					$elm$browser$Debugger$History$Snapshot,
					model,
					$elm$core$Array$fromList(messages))),
			A3(
				$elm$browser$Debugger$History$RecentHistory,
				newModel,
				_List_fromArray(
					[msg]),
				1)) : _Utils_Tuple2(
			$elm$core$Maybe$Nothing,
			A3(
				$elm$browser$Debugger$History$RecentHistory,
				model,
				A2($elm$core$List$cons, msg, messages),
				numMessages + 1));
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $elm$browser$Debugger$History$add = F3(
	function (msg, model, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var _v1 = A3($elm$browser$Debugger$History$addRecent, msg, model, recent);
		if (_v1.a.$ === 'Just') {
			var snapshot = _v1.a.a;
			var newRecent = _v1.b;
			return A3(
				$elm$browser$Debugger$History$History,
				A2($elm$core$Array$push, snapshot, snapshots),
				newRecent,
				numMessages + 1);
		} else {
			var _v2 = _v1.a;
			var newRecent = _v1.b;
			return A3($elm$browser$Debugger$History$History, snapshots, newRecent, numMessages + 1);
		}
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$browser$Debugger$Overlay$BadImport = function (a) {
	return {$: 'BadImport', a: a};
};
var $elm$browser$Debugger$Overlay$RiskyImport = F2(
	function (a, b) {
		return {$: 'RiskyImport', a: a, b: b};
	});
var $elm$browser$Debugger$Report$VersionChanged = F2(
	function (a, b) {
		return {$: 'VersionChanged', a: a, b: b};
	});
var $elm$browser$Debugger$Report$MessageChanged = F2(
	function (a, b) {
		return {$: 'MessageChanged', a: a, b: b};
	});
var $elm$browser$Debugger$Report$SomethingChanged = function (a) {
	return {$: 'SomethingChanged', a: a};
};
var $elm$browser$Debugger$Report$AliasChange = function (a) {
	return {$: 'AliasChange', a: a};
};
var $elm$browser$Debugger$Metadata$checkAlias = F4(
	function (name, old, _new, changes) {
		return (_Utils_eq(old.tipe, _new.tipe) && _Utils_eq(old.args, _new.args)) ? changes : A2(
			$elm$core$List$cons,
			$elm$browser$Debugger$Report$AliasChange(name),
			changes);
	});
var $elm$browser$Debugger$Report$UnionChange = F2(
	function (a, b) {
		return {$: 'UnionChange', a: a, b: b};
	});
var $elm$browser$Debugger$Metadata$addTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				added: A2($elm$core$List$cons, tag, changes.added)
			});
	});
var $elm$browser$Debugger$Metadata$checkTag = F4(
	function (tag, old, _new, changes) {
		return _Utils_eq(old, _new) ? changes : _Utils_update(
			changes,
			{
				changed: A2($elm$core$List$cons, tag, changes.changed)
			});
	});
var $elm$browser$Debugger$Report$TagChanges = F4(
	function (removed, changed, added, argsMatch) {
		return {added: added, argsMatch: argsMatch, changed: changed, removed: removed};
	});
var $elm$browser$Debugger$Report$emptyTagChanges = function (argsMatch) {
	return A4($elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, argsMatch);
};
var $elm$browser$Debugger$Report$hasTagChanges = function (tagChanges) {
	return _Utils_eq(
		tagChanges,
		A4($elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, true));
};
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Debugger$Metadata$removeTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				removed: A2($elm$core$List$cons, tag, changes.removed)
			});
	});
var $elm$browser$Debugger$Metadata$checkUnion = F4(
	function (name, old, _new, changes) {
		var tagChanges = A6(
			$elm$core$Dict$merge,
			$elm$browser$Debugger$Metadata$removeTag,
			$elm$browser$Debugger$Metadata$checkTag,
			$elm$browser$Debugger$Metadata$addTag,
			old.tags,
			_new.tags,
			$elm$browser$Debugger$Report$emptyTagChanges(
				_Utils_eq(old.args, _new.args)));
		return $elm$browser$Debugger$Report$hasTagChanges(tagChanges) ? changes : A2(
			$elm$core$List$cons,
			A2($elm$browser$Debugger$Report$UnionChange, name, tagChanges),
			changes);
	});
var $elm$browser$Debugger$Metadata$ignore = F3(
	function (key, value, report) {
		return report;
	});
var $elm$browser$Debugger$Metadata$checkTypes = F2(
	function (old, _new) {
		return (!_Utils_eq(old.message, _new.message)) ? A2($elm$browser$Debugger$Report$MessageChanged, old.message, _new.message) : $elm$browser$Debugger$Report$SomethingChanged(
			A6(
				$elm$core$Dict$merge,
				$elm$browser$Debugger$Metadata$ignore,
				$elm$browser$Debugger$Metadata$checkUnion,
				$elm$browser$Debugger$Metadata$ignore,
				old.unions,
				_new.unions,
				A6($elm$core$Dict$merge, $elm$browser$Debugger$Metadata$ignore, $elm$browser$Debugger$Metadata$checkAlias, $elm$browser$Debugger$Metadata$ignore, old.aliases, _new.aliases, _List_Nil)));
	});
var $elm$browser$Debugger$Metadata$check = F2(
	function (old, _new) {
		return (!_Utils_eq(old.versions.elm, _new.versions.elm)) ? A2($elm$browser$Debugger$Report$VersionChanged, old.versions.elm, _new.versions.elm) : A2($elm$browser$Debugger$Metadata$checkTypes, old.types, _new.types);
	});
var $elm$browser$Debugger$Report$CorruptHistory = {$: 'CorruptHistory'};
var $elm$browser$Debugger$Overlay$corruptImport = $elm$browser$Debugger$Overlay$BadImport($elm$browser$Debugger$Report$CorruptHistory);
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$browser$Debugger$Report$Fine = {$: 'Fine'};
var $elm$browser$Debugger$Report$Impossible = {$: 'Impossible'};
var $elm$browser$Debugger$Report$Risky = {$: 'Risky'};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$browser$Debugger$Report$some = function (list) {
	return !$elm$core$List$isEmpty(list);
};
var $elm$browser$Debugger$Report$evaluateChange = function (change) {
	if (change.$ === 'AliasChange') {
		return $elm$browser$Debugger$Report$Impossible;
	} else {
		var removed = change.b.removed;
		var changed = change.b.changed;
		var added = change.b.added;
		var argsMatch = change.b.argsMatch;
		return ((!argsMatch) || ($elm$browser$Debugger$Report$some(changed) || $elm$browser$Debugger$Report$some(removed))) ? $elm$browser$Debugger$Report$Impossible : ($elm$browser$Debugger$Report$some(added) ? $elm$browser$Debugger$Report$Risky : $elm$browser$Debugger$Report$Fine);
	}
};
var $elm$browser$Debugger$Report$worstCase = F2(
	function (status, statusList) {
		worstCase:
		while (true) {
			if (!statusList.b) {
				return status;
			} else {
				switch (statusList.a.$) {
					case 'Impossible':
						var _v1 = statusList.a;
						return $elm$browser$Debugger$Report$Impossible;
					case 'Risky':
						var _v2 = statusList.a;
						var rest = statusList.b;
						var $temp$status = $elm$browser$Debugger$Report$Risky,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
					default:
						var _v3 = statusList.a;
						var rest = statusList.b;
						var $temp$status = status,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
				}
			}
		}
	});
var $elm$browser$Debugger$Report$evaluate = function (report) {
	switch (report.$) {
		case 'CorruptHistory':
			return $elm$browser$Debugger$Report$Impossible;
		case 'VersionChanged':
			return $elm$browser$Debugger$Report$Impossible;
		case 'MessageChanged':
			return $elm$browser$Debugger$Report$Impossible;
		default:
			var changes = report.a;
			return A2(
				$elm$browser$Debugger$Report$worstCase,
				$elm$browser$Debugger$Report$Fine,
				A2($elm$core$List$map, $elm$browser$Debugger$Report$evaluateChange, changes));
	}
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$browser$Debugger$Overlay$uploadDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, y);
		}),
	A2($elm$json$Json$Decode$field, 'metadata', $elm$browser$Debugger$Metadata$decoder),
	A2($elm$json$Json$Decode$field, 'history', $elm$json$Json$Decode$value));
var $elm$browser$Debugger$Overlay$assessImport = F2(
	function (metadata, jsonString) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $elm$browser$Debugger$Overlay$uploadDecoder, jsonString);
		if (_v0.$ === 'Err') {
			return $elm$core$Result$Err($elm$browser$Debugger$Overlay$corruptImport);
		} else {
			var _v1 = _v0.a;
			var foreignMetadata = _v1.a;
			var rawHistory = _v1.b;
			var report = A2($elm$browser$Debugger$Metadata$check, foreignMetadata, metadata);
			var _v2 = $elm$browser$Debugger$Report$evaluate(report);
			switch (_v2.$) {
				case 'Impossible':
					return $elm$core$Result$Err(
						$elm$browser$Debugger$Overlay$BadImport(report));
				case 'Risky':
					return $elm$core$Result$Err(
						A2($elm$browser$Debugger$Overlay$RiskyImport, report, rawHistory));
				default:
					return $elm$core$Result$Ok(rawHistory);
			}
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$browser$Debugger$Overlay$close = F2(
	function (msg, state) {
		switch (state.$) {
			case 'None':
				return $elm$core$Maybe$Nothing;
			case 'BadMetadata':
				return $elm$core$Maybe$Nothing;
			case 'BadImport':
				return $elm$core$Maybe$Nothing;
			default:
				var rawHistory = state.b;
				if (msg.$ === 'Cancel') {
					return $elm$core$Maybe$Nothing;
				} else {
					return $elm$core$Maybe$Just(rawHistory);
				}
		}
	});
var $elm$browser$Debugger$History$elmToJs = A2($elm$core$Basics$composeR, _Json_wrap, _Debugger_unsafeCoerce);
var $elm$browser$Debugger$History$encodeHelp = F2(
	function (snapshot, allMessages) {
		return A3($elm$core$Array$foldl, $elm$core$List$cons, allMessages, snapshot.messages);
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$browser$Debugger$History$encode = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	return A2(
		$elm$json$Json$Encode$list,
		$elm$browser$Debugger$History$elmToJs,
		A3(
			$elm$core$Array$foldr,
			$elm$browser$Debugger$History$encodeHelp,
			$elm$core$List$reverse(recent.messages),
			snapshots));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$browser$Debugger$Metadata$encodeAlias = function (_v0) {
	var args = _v0.args;
	var tipe = _v0.tipe;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string(tipe))
			]));
};
var $elm$browser$Debugger$Metadata$encodeDict = F2(
	function (f, dict) {
		return $elm$json$Json$Encode$object(
			$elm$core$Dict$toList(
				A2(
					$elm$core$Dict$map,
					F2(
						function (key, value) {
							return f(value);
						}),
					dict)));
	});
var $elm$browser$Debugger$Metadata$encodeUnion = function (_v0) {
	var args = _v0.args;
	var tags = _v0.tags;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'tags',
				A2(
					$elm$browser$Debugger$Metadata$encodeDict,
					$elm$json$Json$Encode$list($elm$json$Json$Encode$string),
					tags))
			]));
};
var $elm$browser$Debugger$Metadata$encodeTypes = function (_v0) {
	var message = _v0.message;
	var unions = _v0.unions;
	var aliases = _v0.aliases;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'message',
				$elm$json$Json$Encode$string(message)),
				_Utils_Tuple2(
				'aliases',
				A2($elm$browser$Debugger$Metadata$encodeDict, $elm$browser$Debugger$Metadata$encodeAlias, aliases)),
				_Utils_Tuple2(
				'unions',
				A2($elm$browser$Debugger$Metadata$encodeDict, $elm$browser$Debugger$Metadata$encodeUnion, unions))
			]));
};
var $elm$browser$Debugger$Metadata$encodeVersions = function (_v0) {
	var elm = _v0.elm;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'elm',
				$elm$json$Json$Encode$string(elm))
			]));
};
var $elm$browser$Debugger$Metadata$encode = function (_v0) {
	var versions = _v0.versions;
	var types = _v0.types;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'versions',
				$elm$browser$Debugger$Metadata$encodeVersions(versions)),
				_Utils_Tuple2(
				'types',
				$elm$browser$Debugger$Metadata$encodeTypes(types))
			]));
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Debugger$Main$download = F2(
	function (metadata, history) {
		var historyLength = $elm$browser$Debugger$History$size(history);
		return A2(
			$elm$core$Task$perform,
			function (_v0) {
				return $elm$browser$Debugger$Main$NoOp;
			},
			A2(
				_Debugger_download,
				historyLength,
				_Json_unwrap(
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'metadata',
								$elm$browser$Debugger$Metadata$encode(metadata)),
								_Utils_Tuple2(
								'history',
								$elm$browser$Debugger$History$encode(history))
							])))));
	});
var $elm$browser$Debugger$Main$Vertical = F3(
	function (a, b, c) {
		return {$: 'Vertical', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Main$drag = F2(
	function (info, layout) {
		if (layout.$ === 'Horizontal') {
			var status = layout.a;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Horizontal, status, info.x / info.width, y);
		} else {
			var status = layout.a;
			var x = layout.b;
			return A3($elm$browser$Debugger$Main$Vertical, status, x, info.y / info.height);
		}
	});
var $elm$browser$Debugger$History$Stepping = F2(
	function (a, b) {
		return {$: 'Stepping', a: a, b: b};
	});
var $elm$browser$Debugger$History$Done = F2(
	function (a, b) {
		return {$: 'Done', a: a, b: b};
	});
var $elm$browser$Debugger$History$getHelp = F3(
	function (update, msg, getResult) {
		if (getResult.$ === 'Done') {
			return getResult;
		} else {
			var n = getResult.a;
			var model = getResult.b;
			return (!n) ? A2(
				$elm$browser$Debugger$History$Done,
				msg,
				A2(update, msg, model).a) : A2(
				$elm$browser$Debugger$History$Stepping,
				n - 1,
				A2(update, msg, model).a);
		}
	});
var $elm$browser$Debugger$History$undone = function (getResult) {
	undone:
	while (true) {
		if (getResult.$ === 'Done') {
			var msg = getResult.a;
			var model = getResult.b;
			return _Utils_Tuple2(model, msg);
		} else {
			var $temp$getResult = getResult;
			getResult = $temp$getResult;
			continue undone;
		}
	}
};
var $elm$browser$Debugger$History$get = F3(
	function (update, index, history) {
		get:
		while (true) {
			var recent = history.recent;
			var snapshotMax = history.numMessages - recent.numMessages;
			if (_Utils_cmp(index, snapshotMax) > -1) {
				return $elm$browser$Debugger$History$undone(
					A3(
						$elm$core$List$foldr,
						$elm$browser$Debugger$History$getHelp(update),
						A2($elm$browser$Debugger$History$Stepping, index - snapshotMax, recent.model),
						recent.messages));
			} else {
				var _v0 = A2($elm$core$Array$get, (index / $elm$browser$Debugger$History$maxSnapshotSize) | 0, history.snapshots);
				if (_v0.$ === 'Nothing') {
					var $temp$update = update,
						$temp$index = index,
						$temp$history = history;
					update = $temp$update;
					index = $temp$index;
					history = $temp$history;
					continue get;
				} else {
					var model = _v0.a.model;
					var messages = _v0.a.messages;
					return $elm$browser$Debugger$History$undone(
						A3(
							$elm$core$Array$foldr,
							$elm$browser$Debugger$History$getHelp(update),
							A2($elm$browser$Debugger$History$Stepping, index % $elm$browser$Debugger$History$maxSnapshotSize, model),
							messages));
				}
			}
		}
	});
var $elm$browser$Debugger$History$getRecentMsg = function (history) {
	getRecentMsg:
	while (true) {
		var _v0 = history.recent.messages;
		if (!_v0.b) {
			var $temp$history = history;
			history = $temp$history;
			continue getRecentMsg;
		} else {
			var first = _v0.a;
			return first;
		}
	}
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$browser$Debugger$Expando$mergeDictHelp = F3(
	function (oldDict, key, value) {
		var _v12 = A2($elm$core$Dict$get, key, oldDict);
		if (_v12.$ === 'Nothing') {
			return value;
		} else {
			var oldValue = _v12.a;
			return A2($elm$browser$Debugger$Expando$mergeHelp, oldValue, value);
		}
	});
var $elm$browser$Debugger$Expando$mergeHelp = F2(
	function (old, _new) {
		var _v3 = _Utils_Tuple2(old, _new);
		_v3$6:
		while (true) {
			switch (_v3.b.$) {
				case 'S':
					return _new;
				case 'Primitive':
					return _new;
				case 'Sequence':
					if (_v3.a.$ === 'Sequence') {
						var _v4 = _v3.a;
						var isClosed = _v4.b;
						var oldValues = _v4.c;
						var _v5 = _v3.b;
						var seqType = _v5.a;
						var newValues = _v5.c;
						return A3(
							$elm$browser$Debugger$Expando$Sequence,
							seqType,
							isClosed,
							A2($elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _v3$6;
					}
				case 'Dictionary':
					if (_v3.a.$ === 'Dictionary') {
						var _v6 = _v3.a;
						var isClosed = _v6.a;
						var _v7 = _v3.b;
						var keyValuePairs = _v7.b;
						return A2($elm$browser$Debugger$Expando$Dictionary, isClosed, keyValuePairs);
					} else {
						break _v3$6;
					}
				case 'Record':
					if (_v3.a.$ === 'Record') {
						var _v8 = _v3.a;
						var isClosed = _v8.a;
						var oldDict = _v8.b;
						var _v9 = _v3.b;
						var newDict = _v9.b;
						return A2(
							$elm$browser$Debugger$Expando$Record,
							isClosed,
							A2(
								$elm$core$Dict$map,
								$elm$browser$Debugger$Expando$mergeDictHelp(oldDict),
								newDict));
					} else {
						break _v3$6;
					}
				default:
					if (_v3.a.$ === 'Constructor') {
						var _v10 = _v3.a;
						var isClosed = _v10.b;
						var oldValues = _v10.c;
						var _v11 = _v3.b;
						var maybeName = _v11.a;
						var newValues = _v11.c;
						return A3(
							$elm$browser$Debugger$Expando$Constructor,
							maybeName,
							isClosed,
							A2($elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _v3$6;
					}
			}
		}
		return _new;
	});
var $elm$browser$Debugger$Expando$mergeListHelp = F2(
	function (olds, news) {
		var _v0 = _Utils_Tuple2(olds, news);
		if (!_v0.a.b) {
			return news;
		} else {
			if (!_v0.b.b) {
				return news;
			} else {
				var _v1 = _v0.a;
				var x = _v1.a;
				var xs = _v1.b;
				var _v2 = _v0.b;
				var y = _v2.a;
				var ys = _v2.b;
				return A2(
					$elm$core$List$cons,
					A2($elm$browser$Debugger$Expando$mergeHelp, x, y),
					A2($elm$browser$Debugger$Expando$mergeListHelp, xs, ys));
			}
		}
	});
var $elm$browser$Debugger$Expando$merge = F2(
	function (value, expando) {
		return A2(
			$elm$browser$Debugger$Expando$mergeHelp,
			expando,
			_Debugger_init(value));
	});
var $elm$browser$Debugger$Main$jumpUpdate = F3(
	function (update, index, model) {
		var history = $elm$browser$Debugger$Main$cachedHistory(model);
		var currentMsg = $elm$browser$Debugger$History$getRecentMsg(history);
		var currentModel = $elm$browser$Debugger$Main$getLatestModel(model.state);
		var _v0 = A3($elm$browser$Debugger$History$get, update, index, history);
		var indexModel = _v0.a;
		var indexMsg = _v0.b;
		return _Utils_update(
			model,
			{
				expandoModel: A2($elm$browser$Debugger$Expando$merge, indexModel, model.expandoModel),
				expandoMsg: A2($elm$browser$Debugger$Expando$merge, indexMsg, model.expandoMsg),
				state: A5($elm$browser$Debugger$Main$Paused, index, indexModel, currentModel, currentMsg, history)
			});
	});
var $elm$browser$Debugger$History$jsToElm = A2($elm$core$Basics$composeR, _Json_unwrap, _Debugger_unsafeCoerce);
var $elm$browser$Debugger$History$decoder = F2(
	function (initialModel, update) {
		var addMessage = F2(
			function (rawMsg, _v0) {
				var model = _v0.a;
				var history = _v0.b;
				var msg = $elm$browser$Debugger$History$jsToElm(rawMsg);
				return _Utils_Tuple2(
					A2(update, msg, model),
					A3($elm$browser$Debugger$History$add, msg, model, history));
			});
		var updateModel = function (rawMsgs) {
			return A3(
				$elm$core$List$foldl,
				addMessage,
				_Utils_Tuple2(
					initialModel,
					$elm$browser$Debugger$History$empty(initialModel)),
				rawMsgs);
		};
		return A2(
			$elm$json$Json$Decode$map,
			updateModel,
			$elm$json$Json$Decode$list($elm$json$Json$Decode$value));
	});
var $elm$browser$Debugger$History$getInitialModel = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	var _v1 = A2($elm$core$Array$get, 0, snapshots);
	if (_v1.$ === 'Just') {
		var model = _v1.a.model;
		return model;
	} else {
		return recent.model;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$browser$Debugger$Main$loadNewHistory = F3(
	function (rawHistory, update, model) {
		var pureUserUpdate = F2(
			function (msg, userModel) {
				return A2(update, msg, userModel).a;
			});
		var initialUserModel = $elm$browser$Debugger$History$getInitialModel(model.history);
		var decoder = A2($elm$browser$Debugger$History$decoder, initialUserModel, pureUserUpdate);
		var _v0 = A2($elm$json$Json$Decode$decodeValue, decoder, rawHistory);
		if (_v0.$ === 'Err') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{overlay: $elm$browser$Debugger$Overlay$corruptImport}),
				$elm$core$Platform$Cmd$none);
		} else {
			var _v1 = _v0.a;
			var latestUserModel = _v1.a;
			var newHistory = _v1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						expandoModel: $elm$browser$Debugger$Expando$init(latestUserModel),
						expandoMsg: $elm$browser$Debugger$Expando$init(
							$elm$browser$Debugger$History$getRecentMsg(newHistory)),
						history: newHistory,
						overlay: $elm$browser$Debugger$Overlay$none,
						state: $elm$browser$Debugger$Main$Running(latestUserModel)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Debugger$Main$scroll = function (popout) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
		_Debugger_scroll(popout));
};
var $elm$browser$Debugger$Main$scrollTo = F2(
	function (id, popout) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
			A2(_Debugger_scrollTo, id, popout));
	});
var $elm$browser$Debugger$Main$setDragStatus = F2(
	function (status, layout) {
		if (layout.$ === 'Horizontal') {
			var x = layout.b;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Horizontal, status, x, y);
		} else {
			var x = layout.b;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Vertical, status, x, y);
		}
	});
var $elm$browser$Debugger$Main$swapLayout = function (layout) {
	if (layout.$ === 'Horizontal') {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($elm$browser$Debugger$Main$Vertical, s, x, y);
	} else {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($elm$browser$Debugger$Main$Horizontal, s, x, y);
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$browser$Debugger$Expando$updateIndex = F3(
	function (n, func, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			var x = list.a;
			var xs = list.b;
			return (n <= 0) ? A2(
				$elm$core$List$cons,
				func(x),
				xs) : A2(
				$elm$core$List$cons,
				x,
				A3($elm$browser$Debugger$Expando$updateIndex, n - 1, func, xs));
		}
	});
var $elm$browser$Debugger$Expando$update = F2(
	function (msg, value) {
		switch (value.$) {
			case 'S':
				return value;
			case 'Primitive':
				return value;
			case 'Sequence':
				var seqType = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($elm$browser$Debugger$Expando$Sequence, seqType, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v3 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$elm$browser$Debugger$Expando$Sequence,
								seqType,
								isClosed,
								A3(
									$elm$browser$Debugger$Expando$updateIndex,
									index,
									$elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
			case 'Dictionary':
				var isClosed = value.a;
				var keyValuePairs = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($elm$browser$Debugger$Expando$Dictionary, !isClosed, keyValuePairs);
					case 'Index':
						var redirect = msg.a;
						var index = msg.b;
						var subMsg = msg.c;
						switch (redirect.$) {
							case 'None':
								return value;
							case 'Key':
								return A2(
									$elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_v6) {
											var k = _v6.a;
											var v = _v6.b;
											return _Utils_Tuple2(
												A2($elm$browser$Debugger$Expando$update, subMsg, k),
												v);
										},
										keyValuePairs));
							default:
								return A2(
									$elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_v7) {
											var k = _v7.a;
											var v = _v7.b;
											return _Utils_Tuple2(
												k,
												A2($elm$browser$Debugger$Expando$update, subMsg, v));
										},
										keyValuePairs));
						}
					default:
						return value;
				}
			case 'Record':
				var isClosed = value.a;
				var valueDict = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($elm$browser$Debugger$Expando$Record, !isClosed, valueDict);
					case 'Index':
						return value;
					default:
						var field = msg.a;
						var subMsg = msg.b;
						return A2(
							$elm$browser$Debugger$Expando$Record,
							isClosed,
							A3(
								$elm$core$Dict$update,
								field,
								$elm$browser$Debugger$Expando$updateField(subMsg),
								valueDict));
				}
			default:
				var maybeName = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($elm$browser$Debugger$Expando$Constructor, maybeName, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v10 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$elm$browser$Debugger$Expando$Constructor,
								maybeName,
								isClosed,
								A3(
									$elm$browser$Debugger$Expando$updateIndex,
									index,
									$elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
		}
	});
var $elm$browser$Debugger$Expando$updateField = F2(
	function (msg, maybeExpando) {
		if (maybeExpando.$ === 'Nothing') {
			return maybeExpando;
		} else {
			var expando = maybeExpando.a;
			return $elm$core$Maybe$Just(
				A2($elm$browser$Debugger$Expando$update, msg, expando));
		}
	});
var $elm$browser$Debugger$Main$Upload = function (a) {
	return {$: 'Upload', a: a};
};
var $elm$browser$Debugger$Main$upload = function (popout) {
	return A2(
		$elm$core$Task$perform,
		$elm$browser$Debugger$Main$Upload,
		_Debugger_upload(popout));
};
var $elm$browser$Debugger$Overlay$BadMetadata = function (a) {
	return {$: 'BadMetadata', a: a};
};
var $elm$browser$Debugger$Overlay$badMetadata = $elm$browser$Debugger$Overlay$BadMetadata;
var $elm$browser$Debugger$Main$withGoodMetadata = F2(
	function (model, func) {
		var _v0 = model.metadata;
		if (_v0.$ === 'Ok') {
			var metadata = _v0.a;
			return func(metadata);
		} else {
			var error = _v0.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						overlay: $elm$browser$Debugger$Overlay$badMetadata(error)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Debugger$Main$wrapUpdate = F3(
	function (update, msg, model) {
		wrapUpdate:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 'UserMsg':
					var userMsg = msg.a;
					var userModel = $elm$browser$Debugger$Main$getLatestModel(model.state);
					var newHistory = A3($elm$browser$Debugger$History$add, userMsg, userModel, model.history);
					var _v1 = A2(update, userMsg, userModel);
					var newUserModel = _v1.a;
					var userCmds = _v1.b;
					var commands = A2($elm$core$Platform$Cmd$map, $elm$browser$Debugger$Main$UserMsg, userCmds);
					var _v2 = model.state;
					if (_v2.$ === 'Running') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expandoModel: A2($elm$browser$Debugger$Expando$merge, newUserModel, model.expandoModel),
									expandoMsg: A2($elm$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									history: newHistory,
									state: $elm$browser$Debugger$Main$Running(newUserModel)
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										commands,
										$elm$browser$Debugger$Main$scroll(model.popout)
									])));
					} else {
						var index = _v2.a;
						var indexModel = _v2.b;
						var history = _v2.e;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									history: newHistory,
									state: A5($elm$browser$Debugger$Main$Paused, index, indexModel, newUserModel, userMsg, history)
								}),
							commands);
					}
				case 'TweakExpandoMsg':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expandoMsg: A2($elm$browser$Debugger$Expando$update, eMsg, model.expandoMsg)
							}),
						$elm$core$Platform$Cmd$none);
				case 'TweakExpandoModel':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expandoModel: A2($elm$browser$Debugger$Expando$update, eMsg, model.expandoModel)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Resume':
					var _v3 = model.state;
					if (_v3.$ === 'Running') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var userModel = _v3.c;
						var userMsg = _v3.d;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expandoModel: A2($elm$browser$Debugger$Expando$merge, userModel, model.expandoModel),
									expandoMsg: A2($elm$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									state: $elm$browser$Debugger$Main$Running(userModel)
								}),
							$elm$browser$Debugger$Main$scroll(model.popout));
					}
				case 'Jump':
					var index = msg.a;
					return _Utils_Tuple2(
						A3($elm$browser$Debugger$Main$jumpUpdate, update, index, model),
						$elm$core$Platform$Cmd$none);
				case 'SliderJump':
					var index = msg.a;
					return _Utils_Tuple2(
						A3($elm$browser$Debugger$Main$jumpUpdate, update, index, model),
						A2(
							$elm$browser$Debugger$Main$scrollTo,
							$elm$browser$Debugger$History$idForMessageIndex(index),
							model.popout));
				case 'Open':
					return _Utils_Tuple2(
						model,
						A2(
							$elm$core$Task$perform,
							$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
							_Debugger_open(model.popout)));
				case 'Up':
					var _v4 = model.state;
					if (_v4.$ === 'Running') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var i = _v4.a;
						var history = _v4.e;
						var targetIndex = i + 1;
						if (_Utils_cmp(
							targetIndex,
							$elm$browser$Debugger$History$size(history)) < 0) {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$SliderJump(targetIndex),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$Resume,
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						}
					}
				case 'Down':
					var _v5 = model.state;
					if (_v5.$ === 'Running') {
						var $temp$update = update,
							$temp$msg = $elm$browser$Debugger$Main$Jump(
							$elm$browser$Debugger$History$size(model.history) - 1),
							$temp$model = model;
						update = $temp$update;
						msg = $temp$msg;
						model = $temp$model;
						continue wrapUpdate;
					} else {
						var index = _v5.a;
						if (index > 0) {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$SliderJump(index - 1),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					}
				case 'Import':
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (_v6) {
							return _Utils_Tuple2(
								model,
								$elm$browser$Debugger$Main$upload(model.popout));
						});
				case 'Export':
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							return _Utils_Tuple2(
								model,
								A2($elm$browser$Debugger$Main$download, metadata, model.history));
						});
				case 'Upload':
					var jsonString = msg.a;
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							var _v7 = A2($elm$browser$Debugger$Overlay$assessImport, metadata, jsonString);
							if (_v7.$ === 'Err') {
								var newOverlay = _v7.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{overlay: newOverlay}),
									$elm$core$Platform$Cmd$none);
							} else {
								var rawHistory = _v7.a;
								return A3($elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
							}
						});
				case 'OverlayMsg':
					var overlayMsg = msg.a;
					var _v8 = A2($elm$browser$Debugger$Overlay$close, overlayMsg, model.overlay);
					if (_v8.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{overlay: $elm$browser$Debugger$Overlay$none}),
							$elm$core$Platform$Cmd$none);
					} else {
						var rawHistory = _v8.a;
						return A3($elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
					}
				case 'SwapLayout':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: $elm$browser$Debugger$Main$swapLayout(model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				case 'DragStart':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$setDragStatus, $elm$browser$Debugger$Main$Moving, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Drag':
					var info = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$drag, info, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				default:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$setDragStatus, $elm$browser$Debugger$Main$Static, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
			}
		}
	});
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$OutputStyle$FixedSearchStringMinimumLength = function (a) {
	return {$: 'FixedSearchStringMinimumLength', a: a};
};
var $author$project$OptionDisplay$MatureOption = {$: 'MatureOption'};
var $author$project$MuchSelect$NoEffect = {$: 'NoEffect'};
var $author$project$OutputStyle$NoMinimumToSearchStringLength = {$: 'NoMinimumToSearchStringLength'};
var $author$project$OptionSorting$NoSorting = {$: 'NoSorting'};
var $author$project$RightSlot$NotInFocusTransition = {$: 'NotInFocusTransition'};
var $author$project$MuchSelect$ReportErrorMessage = function (a) {
	return {$: 'ReportErrorMessage', a: a};
};
var $author$project$MuchSelect$ReportReady = {$: 'ReportReady'};
var $author$project$RightSlot$ShowClearButton = {$: 'ShowClearButton'};
var $author$project$RightSlot$ShowDropdownIndicator = function (a) {
	return {$: 'ShowDropdownIndicator', a: a};
};
var $author$project$RightSlot$ShowLoadingIndicator = {$: 'ShowLoadingIndicator'};
var $author$project$RightSlot$ShowNothing = {$: 'ShowNothing'};
var $author$project$MuchSelect$UpdateOptionsInWebWorker = {$: 'UpdateOptionsInWebWorker'};
var $author$project$MuchSelect$ValueCasing = F2(
	function (a, b) {
		return {$: 'ValueCasing', a: a, b: b};
	});
var $author$project$Option$NoDescription = {$: 'NoDescription'};
var $author$project$Option$NoOptionGroup = {$: 'NoOptionGroup'};
var $author$project$Option$Option = F6(
	function (a, b, c, d, e, f) {
		return {$: 'Option', a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $author$project$OptionValue$OptionValue = function (a) {
	return {$: 'OptionValue', a: a};
};
var $author$project$SortRank$NoSortRank = {$: 'NoSortRank'};
var $author$project$OptionLabel$OptionLabel = F3(
	function (a, b, c) {
		return {$: 'OptionLabel', a: a, b: b, c: c};
	});
var $author$project$OptionLabel$newWithCleanLabel = F2(
	function (string, maybeString) {
		return A3($author$project$OptionLabel$OptionLabel, string, maybeString, $author$project$SortRank$NoSortRank);
	});
var $author$project$OptionDisplay$OptionSelected = F2(
	function (a, b) {
		return {$: 'OptionSelected', a: a, b: b};
	});
var $author$project$OptionDisplay$selected = function (index) {
	return A2($author$project$OptionDisplay$OptionSelected, index, $author$project$OptionDisplay$MatureOption);
};
var $author$project$Option$newSelectedOption = F3(
	function (index, string, maybeCleanLabel) {
		return A6(
			$author$project$Option$Option,
			$author$project$OptionDisplay$selected(index),
			A2($author$project$OptionLabel$newWithCleanLabel, string, maybeCleanLabel),
			$author$project$OptionValue$OptionValue(string),
			$author$project$Option$NoDescription,
			$author$project$Option$NoOptionGroup,
			$elm$core$Maybe$Nothing);
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$OptionValue$EmptyOptionValue = {$: 'EmptyOptionValue'};
var $author$project$Option$getOptionValue = function (option) {
	switch (option.$) {
		case 'Option':
			var value = option.c;
			return value;
		case 'CustomOption':
			var value = option.c;
			return value;
		case 'EmptyOption':
			return $author$project$OptionValue$EmptyOptionValue;
		default:
			var optionValue = option.b;
			return optionValue;
	}
};
var $author$project$OptionValue$stringToOptionValue = function (string) {
	if (string === '') {
		return $author$project$OptionValue$EmptyOptionValue;
	} else {
		return $author$project$OptionValue$OptionValue(string);
	}
};
var $author$project$OptionsUtilities$optionListContainsOptionWithValueString = F2(
	function (valueString, options) {
		var optionValue = $author$project$OptionValue$stringToOptionValue(valueString);
		return !$elm$core$List$isEmpty(
			A2(
				$elm$core$List$filter,
				function (option_) {
					return _Utils_eq(
						$author$project$Option$getOptionValue(option_),
						optionValue);
				},
				options));
	});
var $author$project$OptionDisplay$isSelected = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return false;
		case 'OptionHidden':
			return false;
		case 'OptionSelected':
			return true;
		case 'OptionSelectedPendingValidation':
			return true;
		case 'OptionSelectedAndInvalid':
			return true;
		case 'OptionSelectedHighlighted':
			return true;
		case 'OptionHighlighted':
			return false;
		case 'OptionDisabled':
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isOptionSelected = function (option) {
	switch (option.$) {
		case 'Option':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isSelected(optionDisplay);
		case 'CustomOption':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isSelected(optionDisplay);
		case 'EmptyOption':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isSelected(optionDisplay);
		default:
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isSelected(optionDisplay);
	}
};
var $author$project$Option$optionValuesEqual = F2(
	function (option, optionValue) {
		return _Utils_eq(
			$author$project$Option$getOptionValue(option),
			optionValue);
	});
var $author$project$OptionDisplay$OptionShown = function (a) {
	return {$: 'OptionShown', a: a};
};
var $author$project$OptionDisplay$removeHighlight = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return optionDisplay;
		case 'OptionHidden':
			return optionDisplay;
		case 'OptionSelected':
			return optionDisplay;
		case 'OptionSelectedPendingValidation':
			return optionDisplay;
		case 'OptionSelectedAndInvalid':
			return optionDisplay;
		case 'OptionSelectedHighlighted':
			var selectedIndex = optionDisplay.a;
			return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption);
		case 'OptionHighlighted':
			return $author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption);
		case 'OptionDisabled':
			return optionDisplay;
		default:
			return optionDisplay;
	}
};
var $author$project$Option$CustomOption = F4(
	function (a, b, c, d) {
		return {$: 'CustomOption', a: a, b: b, c: c, d: d};
	});
var $author$project$Option$DatalistOption = F2(
	function (a, b) {
		return {$: 'DatalistOption', a: a, b: b};
	});
var $author$project$Option$EmptyOption = F2(
	function (a, b) {
		return {$: 'EmptyOption', a: a, b: b};
	});
var $author$project$Option$setOptionDisplay = F2(
	function (optionDisplay, option) {
		switch (option.$) {
			case 'Option':
				var optionLabel = option.b;
				var optionValue = option.c;
				var optionDescription = option.d;
				var optionGroup = option.e;
				var search = option.f;
				return A6($author$project$Option$Option, optionDisplay, optionLabel, optionValue, optionDescription, optionGroup, search);
			case 'CustomOption':
				var optionLabel = option.b;
				var optionValue = option.c;
				var search = option.d;
				return A4($author$project$Option$CustomOption, optionDisplay, optionLabel, optionValue, search);
			case 'EmptyOption':
				var optionLabel = option.b;
				return A2($author$project$Option$EmptyOption, optionDisplay, optionLabel);
			default:
				var optionValue = option.b;
				return A2($author$project$Option$DatalistOption, optionDisplay, optionValue);
		}
	});
var $author$project$Option$removeHighlightFromOption = function (option) {
	switch (option.$) {
		case 'Option':
			var display = option.a;
			return A2(
				$author$project$Option$setOptionDisplay,
				$author$project$OptionDisplay$removeHighlight(display),
				option);
		case 'CustomOption':
			var display = option.a;
			return A2(
				$author$project$Option$setOptionDisplay,
				$author$project$OptionDisplay$removeHighlight(display),
				option);
		case 'EmptyOption':
			var display = option.a;
			return A2(
				$author$project$Option$setOptionDisplay,
				$author$project$OptionDisplay$removeHighlight(display),
				option);
		default:
			return option;
	}
};
var $author$project$Option$getOptionDisplay = function (option) {
	switch (option.$) {
		case 'Option':
			var display = option.a;
			return display;
		case 'CustomOption':
			var display = option.a;
			return display;
		case 'EmptyOption':
			var display = option.a;
			return display;
		default:
			var display = option.a;
			return display;
	}
};
var $author$project$OptionDisplay$OptionSelectedHighlighted = function (a) {
	return {$: 'OptionSelectedHighlighted', a: a};
};
var $author$project$OptionDisplay$select = F2(
	function (selectedIndex, optionDisplay) {
		switch (optionDisplay.$) {
			case 'OptionShown':
				var age = optionDisplay.a;
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, age);
			case 'OptionHidden':
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption);
			case 'OptionSelected':
				var age = optionDisplay.b;
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, age);
			case 'OptionSelectedPendingValidation':
				return optionDisplay;
			case 'OptionSelectedAndInvalid':
				return optionDisplay;
			case 'OptionSelectedHighlighted':
				return $author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex);
			case 'OptionHighlighted':
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption);
			case 'OptionDisabled':
				return optionDisplay;
			default:
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption);
		}
	});
var $author$project$Option$selectOption = F2(
	function (selectionIndex, option) {
		return A2(
			$author$project$Option$setOptionDisplay,
			A2(
				$author$project$OptionDisplay$select,
				selectionIndex,
				$author$project$Option$getOptionDisplay(option)),
			option);
	});
var $author$project$Option$setLabelWithString = F3(
	function (string, maybeCleanString, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				var optionValue = option.c;
				var description = option.d;
				var group = option.e;
				var search = option.f;
				return A6(
					$author$project$Option$Option,
					optionDisplay,
					A2($author$project$OptionLabel$newWithCleanLabel, string, maybeCleanString),
					optionValue,
					description,
					group,
					search);
			case 'CustomOption':
				var optionDisplay = option.a;
				var search = option.d;
				return A4(
					$author$project$Option$CustomOption,
					optionDisplay,
					A2($author$project$OptionLabel$newWithCleanLabel, string, maybeCleanString),
					$author$project$OptionValue$OptionValue(string),
					search);
			case 'EmptyOption':
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$EmptyOption,
					optionDisplay,
					A2($author$project$OptionLabel$newWithCleanLabel, string, maybeCleanString));
			default:
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$DatalistOption,
					optionDisplay,
					$author$project$OptionValue$stringToOptionValue(string));
		}
	});
var $author$project$OptionsUtilities$selectOptionInListByOptionValueWithIndex = F3(
	function (index, value, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				if (A2($author$project$Option$optionValuesEqual, option_, value)) {
					switch (option_.$) {
						case 'Option':
							return A2($author$project$Option$selectOption, index, option_);
						case 'CustomOption':
							if (value.$ === 'OptionValue') {
								var valueStr = value.a;
								return A3(
									$author$project$Option$setLabelWithString,
									valueStr,
									$elm$core$Maybe$Nothing,
									A2($author$project$Option$selectOption, index, option_));
							} else {
								return A2($author$project$Option$selectOption, index, option_);
							}
						case 'EmptyOption':
							return A2($author$project$Option$selectOption, index, option_);
						default:
							return A2($author$project$Option$selectOption, index, option_);
					}
				} else {
					if ($author$project$Option$isOptionSelected(option_)) {
						return option_;
					} else {
						return $author$project$Option$removeHighlightFromOption(option_);
					}
				}
			},
			options);
	});
var $author$project$OptionsUtilities$selectOptionInListByValueStringWithIndex = F3(
	function (index, valueString, options) {
		return A3(
			$author$project$OptionsUtilities$selectOptionInListByOptionValueWithIndex,
			index,
			$author$project$OptionValue$OptionValue(valueString),
			options);
	});
var $author$project$OptionsUtilities$addAndSelectOptionsInOptionsListByString = F2(
	function (strings, options) {
		var helper = F3(
			function (index, valueStrings, options_) {
				helper:
				while (true) {
					if (!valueStrings.b) {
						return options_;
					} else {
						if (!valueStrings.b.b) {
							var valueString = valueStrings.a;
							return A2($author$project$OptionsUtilities$optionListContainsOptionWithValueString, valueString, options_) ? A3($author$project$OptionsUtilities$selectOptionInListByValueStringWithIndex, index, valueString, options_) : _Utils_ap(
								options_,
								_List_fromArray(
									[
										A3($author$project$Option$newSelectedOption, index, valueString, $elm$core$Maybe$Nothing)
									]));
						} else {
							var valueString = valueStrings.a;
							var restOfValueStrings = valueStrings.b;
							if (A2($author$project$OptionsUtilities$optionListContainsOptionWithValueString, valueString, options_)) {
								var $temp$index = index + 1,
									$temp$valueStrings = restOfValueStrings,
									$temp$options_ = A3($author$project$OptionsUtilities$selectOptionInListByValueStringWithIndex, index, valueString, options_);
								index = $temp$index;
								valueStrings = $temp$valueStrings;
								options_ = $temp$options_;
								continue helper;
							} else {
								var $temp$index = index + 1,
									$temp$valueStrings = restOfValueStrings,
									$temp$options_ = _Utils_ap(
									options_,
									_List_fromArray(
										[
											A3($author$project$Option$newSelectedOption, index, valueString, $elm$core$Maybe$Nothing)
										]));
								index = $temp$index;
								valueStrings = $temp$valueStrings;
								options_ = $temp$options_;
								continue helper;
							}
						}
					}
				}
			});
		return A3(helper, 0, strings, options);
	});
var $author$project$MuchSelect$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $author$project$MuchSelect$batch = function (effects) {
	return $author$project$MuchSelect$Batch(effects);
};
var $author$project$TransformAndValidate$ValueTransformAndValidate = F2(
	function (a, b) {
		return {$: 'ValueTransformAndValidate', a: a, b: b};
	});
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $author$project$TransformAndValidate$ToLowercase = {$: 'ToLowercase'};
var $author$project$TransformAndValidate$is = F2(
	function (a, b) {
		return _Utils_eq(a, b);
	});
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm_community$json_extra$Json$Decode$Extra$when = F3(
	function (checkDecoder, check, passDecoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (checkVal) {
				return check(checkVal) ? passDecoder : $elm$json$Json$Decode$fail('Check failed with input');
			},
			checkDecoder);
	});
var $author$project$TransformAndValidate$toLowercaseDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('lowercase'),
	$elm$json$Json$Decode$succeed($author$project$TransformAndValidate$ToLowercase));
var $author$project$TransformAndValidate$transformerDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$TransformAndValidate$toLowercaseDecoder]));
var $author$project$TransformAndValidate$Custom = {$: 'Custom'};
var $author$project$TransformAndValidate$customValidatorDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('custom'),
	$elm$json$Json$Decode$succeed($author$project$TransformAndValidate$Custom));
var $author$project$TransformAndValidate$MinimumLength = F3(
	function (a, b, c) {
		return {$: 'MinimumLength', a: a, b: b, c: c};
	});
var $author$project$TransformAndValidate$ValidationErrorMessage = function (a) {
	return {$: 'ValidationErrorMessage', a: a};
};
var $author$project$TransformAndValidate$validationErrorMessageDecoder = A2($elm$json$Json$Decode$map, $author$project$TransformAndValidate$ValidationErrorMessage, $elm$json$Json$Decode$string);
var $author$project$TransformAndValidate$ShowError = {$: 'ShowError'};
var $author$project$TransformAndValidate$SilentError = {$: 'SilentError'};
var $author$project$TransformAndValidate$validationReportLevelDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		switch (str) {
			case 'error':
				return $elm$json$Json$Decode$succeed($author$project$TransformAndValidate$ShowError);
			case 'silent':
				return $elm$json$Json$Decode$succeed($author$project$TransformAndValidate$SilentError);
			default:
				return $elm$json$Json$Decode$fail('Unknown validation reporting level: ' + str);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$TransformAndValidate$minimumLengthDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('minimum-length'),
	A4(
		$elm$json$Json$Decode$map3,
		$author$project$TransformAndValidate$MinimumLength,
		A2($elm$json$Json$Decode$field, 'level', $author$project$TransformAndValidate$validationReportLevelDecoder),
		A2($elm$json$Json$Decode$field, 'message', $author$project$TransformAndValidate$validationErrorMessageDecoder),
		A2($elm$json$Json$Decode$field, 'minimum-length', $elm$json$Json$Decode$int)));
var $author$project$TransformAndValidate$NoWhiteSpace = F2(
	function (a, b) {
		return {$: 'NoWhiteSpace', a: a, b: b};
	});
var $author$project$TransformAndValidate$noWhiteSpaceDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('no-white-space'),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$TransformAndValidate$NoWhiteSpace,
		A2($elm$json$Json$Decode$field, 'level', $author$project$TransformAndValidate$validationReportLevelDecoder),
		A2($elm$json$Json$Decode$field, 'message', $author$project$TransformAndValidate$validationErrorMessageDecoder)));
var $author$project$TransformAndValidate$validatorDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$TransformAndValidate$noWhiteSpaceDecoder, $author$project$TransformAndValidate$minimumLengthDecoder, $author$project$TransformAndValidate$customValidatorDecoder]));
var $author$project$TransformAndValidate$decoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$TransformAndValidate$ValueTransformAndValidate,
	A2(
		$elm$json$Json$Decode$field,
		'transformers',
		$elm$json$Json$Decode$list($author$project$TransformAndValidate$transformerDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'validators',
		$elm$json$Json$Decode$list($author$project$TransformAndValidate$validatorDecoder)));
var $author$project$TransformAndValidate$empty = A2($author$project$TransformAndValidate$ValueTransformAndValidate, _List_Nil, _List_Nil);
var $author$project$TransformAndValidate$decode = function (jsonString) {
	return ($elm$core$String$length(jsonString) > 1) ? A2($elm$json$Json$Decode$decodeString, $author$project$TransformAndValidate$decoder, jsonString) : $elm$core$Result$Ok($author$project$TransformAndValidate$empty);
};
var $author$project$OutputStyle$FixedMaxDropdownItems = function (a) {
	return {$: 'FixedMaxDropdownItems', a: a};
};
var $author$project$PositiveInt$PositiveInt = function (a) {
	return {$: 'PositiveInt', a: a};
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$PositiveInt$new = function (_int) {
	return $author$project$PositiveInt$PositiveInt(
		$elm$core$Basics$abs(_int));
};
var $author$project$OutputStyle$defaultMaxDropdownItemsNum = $author$project$PositiveInt$new(1000);
var $author$project$OutputStyle$defaultMaxDropdownItems = $author$project$OutputStyle$FixedMaxDropdownItems($author$project$OutputStyle$defaultMaxDropdownItemsNum);
var $author$project$OutputStyle$defaultSearchStringMinimumLength = $author$project$OutputStyle$FixedSearchStringMinimumLength(
	$author$project$PositiveInt$new(2));
var $author$project$SelectedValueEncoding$CommaSeperated = {$: 'CommaSeperated'};
var $author$project$SelectedValueEncoding$defaultSelectedValueEncoding = $author$project$SelectedValueEncoding$CommaSeperated;
var $author$project$OutputStyle$AllowLightDomChanges = {$: 'AllowLightDomChanges'};
var $author$project$OutputStyle$Collapsed = {$: 'Collapsed'};
var $author$project$OutputStyle$NoCustomOptions = {$: 'NoCustomOptions'};
var $author$project$OutputStyle$NoFooter = {$: 'NoFooter'};
var $author$project$OutputStyle$NoLimitToDropdownItems = {$: 'NoLimitToDropdownItems'};
var $author$project$OutputStyle$SelectedItemStaysInPlace = {$: 'SelectedItemStaysInPlace'};
var $author$project$SelectionMode$SingleSelectConfig = F3(
	function (a, b, c) {
		return {$: 'SingleSelectConfig', a: a, b: b, c: c};
	});
var $author$project$OutputStyle$SingleSelectCustomHtml = function (a) {
	return {$: 'SingleSelectCustomHtml', a: a};
};
var $author$project$SelectionMode$Unfocused = {$: 'Unfocused'};
var $author$project$SelectionMode$defaultSelectionConfig = A3(
	$author$project$SelectionMode$SingleSelectConfig,
	$author$project$OutputStyle$SingleSelectCustomHtml(
		{
			customOptions: $author$project$OutputStyle$NoCustomOptions,
			dropdownState: $author$project$OutputStyle$Collapsed,
			dropdownStyle: $author$project$OutputStyle$NoFooter,
			eventsMode: $author$project$OutputStyle$AllowLightDomChanges,
			maxDropdownItems: $author$project$OutputStyle$NoLimitToDropdownItems,
			searchStringMinimumLength: $author$project$OutputStyle$FixedSearchStringMinimumLength(
				$author$project$PositiveInt$new(2)),
			selectedItemPlacementMode: $author$project$OutputStyle$SelectedItemStaysInPlace
		}),
	_Utils_Tuple2(false, ''),
	$author$project$SelectionMode$Unfocused);
var $author$project$SelectedValueEncoding$JsonEncoded = {$: 'JsonEncoded'};
var $author$project$SelectedValueEncoding$fromMaybeString = function (maybeString) {
	if (maybeString.$ === 'Just') {
		var string = maybeString.a;
		switch (string) {
			case 'json':
				return $elm$core$Result$Ok($author$project$SelectedValueEncoding$JsonEncoded);
			case 'comma':
				return $elm$core$Result$Ok($author$project$SelectedValueEncoding$CommaSeperated);
			default:
				return $elm$core$Result$Err('Invalid selected value encoding: ' + string);
		}
	} else {
		return $elm$core$Result$Ok($author$project$SelectedValueEncoding$defaultSelectedValueEncoding);
	}
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$PositiveInt$maybeNew = function (_int) {
	return (_int >= 0) ? $elm$core$Maybe$Just(
		$author$project$PositiveInt$PositiveInt(_int)) : $elm$core$Maybe$Nothing;
};
var $author$project$PositiveInt$fromString = function (str) {
	return A2(
		$elm$core$Maybe$andThen,
		$author$project$PositiveInt$maybeNew,
		$elm$core$String$toInt(str));
};
var $author$project$MuchSelect$getDebouceDelayForSearch = function (numberOfOptions) {
	return (numberOfOptions < 100) ? 1 : ((numberOfOptions < 1000) ? 100 : 1000);
};
var $author$project$SelectionMode$getEventMode = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.eventsMode;
		} else {
			var eventsMode = singleSelectOutputStyle.a;
			return eventsMode;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.eventsMode;
		} else {
			var eventsMode = multiSelectOutputStyle.a;
			return eventsMode;
		}
	}
};
var $author$project$Option$getOptionValueAsString = function (option) {
	var _v0 = $author$project$Option$getOptionValue(option);
	if (_v0.$ === 'OptionValue') {
		var string = _v0.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$SelectionMode$CustomHtml = {$: 'CustomHtml'};
var $author$project$SelectionMode$Datalist = {$: 'Datalist'};
var $author$project$SelectionMode$getOutputStyle = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			return $author$project$SelectionMode$CustomHtml;
		} else {
			return $author$project$SelectionMode$Datalist;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			return $author$project$SelectionMode$CustomHtml;
		} else {
			return $author$project$SelectionMode$Datalist;
		}
	}
};
var $author$project$SelectionMode$MultiSelect = {$: 'MultiSelect'};
var $author$project$SelectionMode$SingleSelect = {$: 'SingleSelect'};
var $author$project$SelectionMode$getSelectionMode = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		return $author$project$SelectionMode$SingleSelect;
	} else {
		return $author$project$SelectionMode$MultiSelect;
	}
};
var $author$project$OptionDisplay$getSelectedIndex = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return -1;
		case 'OptionHidden':
			return -1;
		case 'OptionSelected':
			var _int = optionDisplay.a;
			return _int;
		case 'OptionSelectedPendingValidation':
			var _int = optionDisplay.a;
			return _int;
		case 'OptionSelectedAndInvalid':
			var _int = optionDisplay.a;
			return _int;
		case 'OptionSelectedHighlighted':
			var _int = optionDisplay.a;
			return _int;
		case 'OptionHighlighted':
			return -1;
		case 'OptionDisabled':
			return -1;
		default:
			return -1;
	}
};
var $author$project$Option$getOptionSelectedIndex = function (option) {
	switch (option.$) {
		case 'Option':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$getSelectedIndex(optionDisplay);
		case 'CustomOption':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$getSelectedIndex(optionDisplay);
		case 'EmptyOption':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$getSelectedIndex(optionDisplay);
		default:
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$getSelectedIndex(optionDisplay);
	}
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$OptionsUtilities$selectedOptions = function (options) {
	return A2(
		$elm$core$List$sortBy,
		$author$project$Option$getOptionSelectedIndex,
		A2($elm$core$List$filter, $author$project$Option$isOptionSelected, options));
};
var $author$project$OptionsUtilities$hasSelectedOption = function (options) {
	return !$elm$core$List$isEmpty(
		$author$project$OptionsUtilities$selectedOptions(options));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $grotsev$elm_debouncer$Bounce$Bounce = function (a) {
	return {$: 'Bounce', a: a};
};
var $grotsev$elm_debouncer$Bounce$init = $grotsev$elm_debouncer$Bounce$Bounce(0);
var $author$project$Option$isEmptyOption = function (option) {
	switch (option.$) {
		case 'Option':
			return false;
		case 'CustomOption':
			return false;
		case 'EmptyOption':
			return true;
		default:
			var optionValue = option.b;
			if (optionValue.$ === 'OptionValue') {
				return false;
			} else {
				return true;
			}
	}
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$OptionValue$optionValueToString = function (optionValue) {
	if (optionValue.$ === 'OptionValue') {
		var valueString = optionValue.a;
		return valueString;
	} else {
		return '';
	}
};
var $author$project$OptionsUtilities$isOptionValueInListOfOptionsByValue = F2(
	function (optionValue, options) {
		return A2(
			$elm$core$List$any,
			function (option) {
				return _Utils_eq(
					$author$project$OptionValue$optionValueToString(
						$author$project$Option$getOptionValue(option)),
					$author$project$OptionValue$optionValueToString(optionValue));
			},
			options);
	});
var $author$project$PositiveInt$isZero = function (_v0) {
	var positiveInt = _v0.a;
	return !positiveInt;
};
var $author$project$MuchSelect$ChangeTheLightDom = function (a) {
	return {$: 'ChangeTheLightDom', a: a};
};
var $author$project$MuchSelect$ReportInitialValueSet = function (a) {
	return {$: 'ReportInitialValueSet', a: a};
};
var $author$project$LightDomChange$UpdateSelectedValue = function (a) {
	return {$: 'UpdateSelectedValue', a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$OptionLabel$new = function (string) {
	return A3($author$project$OptionLabel$OptionLabel, string, $elm$core$Maybe$Nothing, $author$project$SortRank$NoSortRank);
};
var $author$project$Option$getOptionLabel = function (option) {
	switch (option.$) {
		case 'Option':
			var label = option.b;
			return label;
		case 'CustomOption':
			var label = option.b;
			return label;
		case 'EmptyOption':
			var label = option.b;
			return label;
		default:
			var optionValue = option.b;
			return $author$project$OptionLabel$new(
				$author$project$OptionValue$optionValueToString(optionValue));
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$OptionDisplay$isInvalid = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return false;
		case 'OptionHidden':
			return false;
		case 'OptionSelected':
			return false;
		case 'OptionSelectedPendingValidation':
			return false;
		case 'OptionSelectedAndInvalid':
			return true;
		case 'OptionSelectedHighlighted':
			return false;
		case 'OptionHighlighted':
			return false;
		case 'OptionDisabled':
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isInvalid = function (option) {
	return $author$project$OptionDisplay$isInvalid(
		$author$project$Option$getOptionDisplay(option));
};
var $author$project$OptionDisplay$isPendingValidation = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return false;
		case 'OptionHidden':
			return false;
		case 'OptionSelected':
			return false;
		case 'OptionSelectedPendingValidation':
			return true;
		case 'OptionSelectedAndInvalid':
			return false;
		case 'OptionSelectedHighlighted':
			return false;
		case 'OptionHighlighted':
			return false;
		case 'OptionDisabled':
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isPendingValidation = function (option) {
	return $author$project$OptionDisplay$isPendingValidation(
		$author$project$Option$getOptionDisplay(option));
};
var $author$project$Option$isValid = function (option) {
	return !($author$project$Option$isInvalid(option) || $author$project$Option$isPendingValidation(option));
};
var $author$project$OptionLabel$optionLabelToString = function (optionLabel) {
	var label = optionLabel.a;
	return label;
};
var $author$project$Ports$optionEncoder = function (option) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(
					$author$project$Option$getOptionValueAsString(option))),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToString(
						$author$project$Option$getOptionLabel(option)))),
				_Utils_Tuple2(
				'isValid',
				$elm$json$Json$Encode$bool(
					$author$project$Option$isValid(option))),
				_Utils_Tuple2(
				'selectedIndex',
				$elm$json$Json$Encode$int(
					$author$project$Option$getOptionSelectedIndex(option)))
			]));
};
var $author$project$Ports$optionsEncoder = function (options) {
	return A2($elm$json$Json$Encode$list, $author$project$Ports$optionEncoder, options);
};
var $author$project$OptionsUtilities$findSelectedOption = function (options) {
	return $elm$core$List$head(
		$author$project$OptionsUtilities$selectedOptions(options));
};
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$SelectedValueEncoding$rawSelectedValue = F3(
	function (selectionMode, selectedValueEncoding, options) {
		if (selectionMode.$ === 'SingleSelect') {
			var _v1 = $author$project$OptionsUtilities$findSelectedOption(options);
			if (_v1.$ === 'Just') {
				var selectedOption = _v1.a;
				var valueAsString = $author$project$Option$getOptionValueAsString(selectedOption);
				if (selectedValueEncoding.$ === 'JsonEncoded') {
					return $elm$json$Json$Encode$string(
						$elm$url$Url$percentEncode(
							A2(
								$elm$json$Json$Encode$encode,
								0,
								$elm$json$Json$Encode$string(valueAsString))));
				} else {
					return $elm$json$Json$Encode$string(valueAsString);
				}
			} else {
				if (selectedValueEncoding.$ === 'JsonEncoded') {
					return $elm$json$Json$Encode$string(
						$elm$url$Url$percentEncode(
							A2(
								$elm$json$Json$Encode$encode,
								0,
								$elm$json$Json$Encode$string(''))));
				} else {
					return $elm$json$Json$Encode$string('');
				}
			}
		} else {
			var selectedValues = A2(
				$elm$core$List$map,
				$author$project$Option$getOptionValueAsString,
				$author$project$OptionsUtilities$selectedOptions(options));
			if (selectedValueEncoding.$ === 'JsonEncoded') {
				return $elm$json$Json$Encode$string(
					$elm$url$Url$percentEncode(
						A2(
							$elm$json$Json$Encode$encode,
							0,
							A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, selectedValues))));
			} else {
				return $elm$json$Json$Encode$string(
					A2($elm$core$String$join, ',', selectedValues));
			}
		}
	});
var $author$project$SelectedValueEncoding$selectedValue = F2(
	function (selectionMode, options) {
		if (selectionMode.$ === 'SingleSelect') {
			var _v1 = $author$project$OptionsUtilities$findSelectedOption(options);
			if (_v1.$ === 'Just') {
				var selectedOption = _v1.a;
				var valueAsString = $author$project$Option$getOptionValueAsString(selectedOption);
				return $elm$json$Json$Encode$string(valueAsString);
			} else {
				return $elm$json$Json$Encode$string('');
			}
		} else {
			var selectedValues = A2(
				$elm$core$List$map,
				$author$project$Option$getOptionValueAsString,
				$author$project$OptionsUtilities$selectedOptions(options));
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, selectedValues);
		}
	});
var $author$project$MuchSelect$makeEffectsForInitialValue = F4(
	function (eventsMode, selectionMode, selectedValueEncoding, selectedOptions) {
		if (eventsMode.$ === 'EventsOnly') {
			return $author$project$MuchSelect$ReportInitialValueSet(
				$author$project$Ports$optionsEncoder(selectedOptions));
		} else {
			return $author$project$MuchSelect$Batch(
				_List_fromArray(
					[
						$author$project$MuchSelect$ReportInitialValueSet(
						$author$project$Ports$optionsEncoder(selectedOptions)),
						$author$project$MuchSelect$ChangeTheLightDom(
						$author$project$LightDomChange$UpdateSelectedValue(
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'rawValue',
										A3($author$project$SelectedValueEncoding$rawSelectedValue, selectionMode, selectedValueEncoding, selectedOptions)),
										_Utils_Tuple2(
										'value',
										A2($author$project$SelectedValueEncoding$selectedValue, selectionMode, selectedOptions)),
										_Utils_Tuple2(
										'selectionMode',
										function () {
											if (selectionMode.$ === 'SingleSelect') {
												return $elm$json$Json$Encode$string('single-select');
											} else {
												return $elm$json$Json$Encode$string('multi-select');
											}
										}())
									]))))
					]));
		}
	});
var $author$project$SelectionMode$Disabled = {$: 'Disabled'};
var $author$project$SelectionMode$MultiSelectConfig = F3(
	function (a, b, c) {
		return {$: 'MultiSelectConfig', a: a, b: b, c: c};
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$OutputStyle$AllowCustomOptions = F2(
	function (a, b) {
		return {$: 'AllowCustomOptions', a: a, b: b};
	});
var $author$project$OutputStyle$DisableSingleItemRemoval = {$: 'DisableSingleItemRemoval'};
var $author$project$OutputStyle$EnableSingleItemRemoval = {$: 'EnableSingleItemRemoval'};
var $author$project$OutputStyle$EventsOnly = {$: 'EventsOnly'};
var $author$project$OutputStyle$MultiSelectCustomHtml = function (a) {
	return {$: 'MultiSelectCustomHtml', a: a};
};
var $author$project$OutputStyle$MultiSelectDataList = F2(
	function (a, b) {
		return {$: 'MultiSelectDataList', a: a, b: b};
	});
var $author$project$OutputStyle$ShowFooter = {$: 'ShowFooter'};
var $author$project$SelectionMode$makeMultiSelectOutputStyle = F9(
	function (outputStyle, isEventsOnly_, allowCustomOptions, enableMultiSelectSingleItemRemoval, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate) {
		if (outputStyle.$ === 'CustomHtml') {
			var singleItemRemoval = enableMultiSelectSingleItemRemoval ? $author$project$OutputStyle$EnableSingleItemRemoval : $author$project$OutputStyle$DisableSingleItemRemoval;
			var eventsMode = isEventsOnly_ ? $author$project$OutputStyle$EventsOnly : $author$project$OutputStyle$AllowLightDomChanges;
			var dropdownStyle = shouldShowDropdownFooter ? $author$project$OutputStyle$ShowFooter : $author$project$OutputStyle$NoFooter;
			var customOptions = allowCustomOptions ? A2($author$project$OutputStyle$AllowCustomOptions, customOptionHint, transformAndValidate) : $author$project$OutputStyle$NoCustomOptions;
			return $elm$core$Result$Ok(
				$author$project$OutputStyle$MultiSelectCustomHtml(
					{customOptions: customOptions, dropdownState: $author$project$OutputStyle$Collapsed, dropdownStyle: dropdownStyle, eventsMode: eventsMode, maxDropdownItems: maxDropdownItems, searchStringMinimumLength: searchStringMinimumLength, singleItemRemoval: singleItemRemoval}));
		} else {
			var eventsMode = isEventsOnly_ ? $author$project$OutputStyle$EventsOnly : $author$project$OutputStyle$AllowLightDomChanges;
			return $elm$core$Result$Ok(
				A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, transformAndValidate));
		}
	});
var $author$project$OutputStyle$SelectedItemMovesToTheTop = {$: 'SelectedItemMovesToTheTop'};
var $author$project$OutputStyle$SingleSelectDatalist = F2(
	function (a, b) {
		return {$: 'SingleSelectDatalist', a: a, b: b};
	});
var $author$project$SelectionMode$makeSingleSelectOutputStyle = F9(
	function (outputStyle, isEventsOnly_, allowCustomOptions, selectedItemStaysInPlace, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate) {
		if (outputStyle.$ === 'CustomHtml') {
			var selectedItemPlacementMode = selectedItemStaysInPlace ? $author$project$OutputStyle$SelectedItemStaysInPlace : $author$project$OutputStyle$SelectedItemMovesToTheTop;
			var eventsMode = isEventsOnly_ ? $author$project$OutputStyle$EventsOnly : $author$project$OutputStyle$AllowLightDomChanges;
			var dropdownStyle = shouldShowDropdownFooter ? $author$project$OutputStyle$ShowFooter : $author$project$OutputStyle$NoFooter;
			var customOptions = allowCustomOptions ? A2($author$project$OutputStyle$AllowCustomOptions, customOptionHint, transformAndValidate) : $author$project$OutputStyle$NoCustomOptions;
			return $elm$core$Result$Ok(
				$author$project$OutputStyle$SingleSelectCustomHtml(
					{customOptions: customOptions, dropdownState: $author$project$OutputStyle$Collapsed, dropdownStyle: dropdownStyle, eventsMode: eventsMode, maxDropdownItems: maxDropdownItems, searchStringMinimumLength: searchStringMinimumLength, selectedItemPlacementMode: selectedItemPlacementMode}));
		} else {
			var eventsMode = isEventsOnly_ ? $author$project$OutputStyle$EventsOnly : $author$project$OutputStyle$AllowLightDomChanges;
			return $elm$core$Result$Ok(
				A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, transformAndValidate));
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$SelectionMode$stringToOutputStyle = function (string) {
	switch (string) {
		case 'customHtml':
			return $elm$core$Result$Ok($author$project$SelectionMode$CustomHtml);
		case 'custom-html':
			return $elm$core$Result$Ok($author$project$SelectionMode$CustomHtml);
		case 'datalist':
			return $elm$core$Result$Ok($author$project$SelectionMode$Datalist);
		case '':
			return $elm$core$Result$Ok($author$project$SelectionMode$CustomHtml);
		default:
			return $elm$core$Result$Err('Invalid output style');
	}
};
var $author$project$SelectionMode$makeSelectionConfig = function (isEventsOnly_) {
	return function (disabled) {
		return function (allowMultiSelect) {
			return function (allowCustomOptions) {
				return function (outputStyle) {
					return function (placeholder) {
						return function (customOptionHint) {
							return function (enableMultiSelectSingleItemRemoval) {
								return function (maxDropdownItems) {
									return function (selectedItemStaysInPlace) {
										return function (searchStringMinimumLength) {
											return function (shouldShowDropdownFooter) {
												return function (transformAndValidate) {
													var outputStyleResult = $author$project$SelectionMode$stringToOutputStyle(outputStyle);
													var interactionState = disabled ? $author$project$SelectionMode$Disabled : $author$project$SelectionMode$Unfocused;
													return A2(
														$elm$core$Result$andThen,
														function (s) {
															if (allowMultiSelect) {
																var styleResult = A9($author$project$SelectionMode$makeMultiSelectOutputStyle, s, isEventsOnly_, allowCustomOptions, enableMultiSelectSingleItemRemoval, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate);
																return A2(
																	$elm$core$Result$map,
																	function (style_) {
																		return A3($author$project$SelectionMode$MultiSelectConfig, style_, placeholder, interactionState);
																	},
																	styleResult);
															} else {
																var styleResult = A9($author$project$SelectionMode$makeSingleSelectOutputStyle, s, isEventsOnly_, allowCustomOptions, selectedItemStaysInPlace, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate);
																return A2(
																	$elm$core$Result$map,
																	function (style_) {
																		return A3($author$project$SelectionMode$SingleSelectConfig, style_, placeholder, interactionState);
																	},
																	styleResult);
															}
														},
														outputStyleResult);
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$OptionDisplay$default = $author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption);
var $author$project$Option$newOption = F2(
	function (value, maybeCleanLabel) {
		if (value === '') {
			return A2(
				$author$project$Option$EmptyOption,
				$author$project$OptionDisplay$default,
				A2($author$project$OptionLabel$newWithCleanLabel, '', maybeCleanLabel));
		} else {
			return A6(
				$author$project$Option$Option,
				$author$project$OptionDisplay$default,
				A2($author$project$OptionLabel$newWithCleanLabel, value, maybeCleanLabel),
				$author$project$OptionValue$OptionValue(value),
				$author$project$Option$NoDescription,
				$author$project$Option$NoOptionGroup,
				$elm$core$Maybe$Nothing);
		}
	});
var $author$project$OptionDisplay$OptionDisabled = function (a) {
	return {$: 'OptionDisabled', a: a};
};
var $author$project$OptionDisplay$decoder = function (age) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$andThen,
				function (str) {
					if (str === 'true') {
						return $elm$json$Json$Decode$succeed(
							A2($author$project$OptionDisplay$OptionSelected, 0, age));
					} else {
						return $elm$json$Json$Decode$fail('Option is not selected');
					}
				},
				A2($elm$json$Json$Decode$field, 'selected', $elm$json$Json$Decode$string)),
				A2(
				$elm$json$Json$Decode$andThen,
				function (isSelected_) {
					return isSelected_ ? $elm$json$Json$Decode$succeed(
						A2($author$project$OptionDisplay$OptionSelected, 0, age)) : $elm$json$Json$Decode$succeed(
						$author$project$OptionDisplay$OptionShown(age));
				},
				A2($elm$json$Json$Decode$field, 'selected', $elm$json$Json$Decode$bool)),
				A2(
				$elm$json$Json$Decode$andThen,
				function (isDisabled) {
					return isDisabled ? $elm$json$Json$Decode$succeed(
						$author$project$OptionDisplay$OptionDisabled(age)) : $elm$json$Json$Decode$fail('Option is not disabled');
				},
				A2($elm$json$Json$Decode$field, 'disabled', $elm$json$Json$Decode$bool)),
				$elm$json$Json$Decode$succeed(
				$author$project$OptionDisplay$OptionShown(age))
			]));
};
var $elm$core$String$trim = _String_trim;
var $author$project$Option$valueDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (valueStr) {
		var _v0 = $elm$core$String$trim(valueStr);
		if (_v0 === '') {
			return $elm$json$Json$Decode$succeed($author$project$OptionValue$EmptyOptionValue);
		} else {
			var str = _v0;
			return $elm$json$Json$Decode$succeed(
				$author$project$OptionValue$OptionValue(str));
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Option$decodeOptionForDatalist = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Option$DatalistOption,
	$author$project$OptionDisplay$decoder($author$project$OptionDisplay$MatureOption),
	A2($elm$json$Json$Decode$field, 'value', $author$project$Option$valueDecoder));
var $author$project$Option$OptionDescription = F2(
	function (a, b) {
		return {$: 'OptionDescription', a: a, b: b};
	});
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$Option$descriptionDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A3(
			$elm$json$Json$Decode$map2,
			$author$project$Option$OptionDescription,
			A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string),
			A2(
				$elm$json$Json$Decode$field,
				'descriptionClean',
				$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string))),
			$elm$json$Json$Decode$succeed($author$project$Option$NoDescription)
		]));
var $author$project$SortRank$Auto = function (a) {
	return {$: 'Auto', a: a};
};
var $author$project$SortRank$Manual = function (a) {
	return {$: 'Manual', a: a};
};
var $author$project$SortRank$sortRankDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (_int) {
				var _v0 = $author$project$PositiveInt$maybeNew(_int);
				if (_v0.$ === 'Just') {
					var positiveInt = _v0.a;
					return $elm$json$Json$Decode$succeed(
						$author$project$SortRank$Auto(positiveInt));
				} else {
					return $elm$json$Json$Decode$fail('The index must be a positive number.');
				}
			},
			A2($elm$json$Json$Decode$field, 'index', $elm$json$Json$Decode$int)),
			A2(
			$elm$json$Json$Decode$andThen,
			function (_int) {
				var _v1 = $author$project$PositiveInt$maybeNew(_int);
				if (_v1.$ === 'Just') {
					var positiveInt = _v1.a;
					return $elm$json$Json$Decode$succeed(
						$author$project$SortRank$Manual(positiveInt));
				} else {
					return $elm$json$Json$Decode$fail('The weight must be a positive number.');
				}
			},
			A2($elm$json$Json$Decode$field, 'weight', $elm$json$Json$Decode$int)),
			$elm$json$Json$Decode$succeed($author$project$SortRank$NoSortRank)
		]));
var $author$project$OptionLabel$labelDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$OptionLabel$OptionLabel,
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'labelClean',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string)),
	$author$project$SortRank$sortRankDecoder);
var $elm$json$Json$Decode$map6 = _Json_map6;
var $author$project$Option$OptionGroup = function (a) {
	return {$: 'OptionGroup', a: a};
};
var $author$project$Option$optionGroupDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			$author$project$Option$OptionGroup,
			A2($elm$json$Json$Decode$field, 'group', $elm$json$Json$Decode$string)),
			$elm$json$Json$Decode$succeed($author$project$Option$NoOptionGroup)
		]));
var $author$project$Option$decodeOptionWithAValue = function (age) {
	return A7(
		$elm$json$Json$Decode$map6,
		$author$project$Option$Option,
		$author$project$OptionDisplay$decoder(age),
		$author$project$OptionLabel$labelDecoder,
		A2($elm$json$Json$Decode$field, 'value', $author$project$Option$valueDecoder),
		$author$project$Option$descriptionDecoder,
		$author$project$Option$optionGroupDecoder,
		$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing));
};
var $author$project$Option$decodeOptionWithoutAValue = function (age) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (value) {
			if (value.$ === 'OptionValue') {
				return $elm$json$Json$Decode$fail('It can not be an option without a value because it has a value.');
			} else {
				return A3(
					$elm$json$Json$Decode$map2,
					$author$project$Option$EmptyOption,
					$author$project$OptionDisplay$decoder(age),
					$author$project$OptionLabel$labelDecoder);
			}
		},
		A2($elm$json$Json$Decode$field, 'value', $author$project$Option$valueDecoder));
};
var $author$project$Option$decoder = F2(
	function (age, outputStyle) {
		if (outputStyle.$ === 'CustomHtml') {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						$author$project$Option$decodeOptionWithoutAValue(age),
						$author$project$Option$decodeOptionWithAValue(age)
					]));
		} else {
			return $author$project$Option$decodeOptionForDatalist;
		}
	});
var $author$project$Option$optionsDecoder = F2(
	function (age, outputStyle) {
		return $elm$json$Json$Decode$list(
			A2($author$project$Option$decoder, age, outputStyle));
	});
var $author$project$OptionDisplay$deselect = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return optionDisplay;
		case 'OptionHidden':
			return optionDisplay;
		case 'OptionSelected':
			var age = optionDisplay.b;
			return $author$project$OptionDisplay$OptionShown(age);
		case 'OptionSelectedPendingValidation':
			return $author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption);
		case 'OptionSelectedAndInvalid':
			return $author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption);
		case 'OptionSelectedHighlighted':
			return $author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption);
		case 'OptionHighlighted':
			return optionDisplay;
		case 'OptionDisabled':
			return optionDisplay;
		default:
			return $author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption);
	}
};
var $author$project$Option$deselectOption = function (option) {
	return A2(
		$author$project$Option$setOptionDisplay,
		$author$project$OptionDisplay$deselect(
			$author$project$Option$getOptionDisplay(option)),
		option);
};
var $author$project$OptionsUtilities$unselectedOptions = function (options) {
	return A2(
		$elm$core$List$filter,
		function (option) {
			return !$author$project$Option$isOptionSelected(option);
		},
		options);
};
var $author$project$OptionsUtilities$reIndexSelectedOptions = function (options) {
	var selectedOptions_ = $author$project$OptionsUtilities$selectedOptions(options);
	var nonSelectedOptions = $author$project$OptionsUtilities$unselectedOptions(options);
	return _Utils_ap(
		A2(
			$elm$core$List$indexedMap,
			F2(
				function (index, option) {
					return A2($author$project$Option$selectOption, index, option);
				}),
			selectedOptions_),
		nonSelectedOptions);
};
var $author$project$OptionsUtilities$removeEmptyOptions = function (options) {
	return A2(
		$elm$core$List$filter,
		A2($elm$core$Basics$composeR, $author$project$Option$isEmptyOption, $elm$core$Basics$not),
		options);
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$List$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$List$cons, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$uniqueBy = F2(
	function (f, list) {
		return A4($elm_community$list_extra$List$Extra$uniqueHelp, f, _List_Nil, list, _List_Nil);
	});
var $author$project$OptionsUtilities$organizeNewDatalistOptions = function (options) {
	var selectedOptions_ = $author$project$OptionsUtilities$selectedOptions(options);
	var optionsForTheDatasetHints = $author$project$OptionsUtilities$removeEmptyOptions(
		A2(
			$elm_community$list_extra$List$Extra$uniqueBy,
			$author$project$Option$getOptionValue,
			A2(
				$elm$core$List$map,
				$author$project$Option$deselectOption,
				A2(
					$elm$core$List$filter,
					A2($elm$core$Basics$composeR, $author$project$Option$isOptionSelected, $elm$core$Basics$not),
					options))));
	return $author$project$OptionsUtilities$reIndexSelectedOptions(
		_Utils_ap(selectedOptions_, optionsForTheDatasetHints));
};
var $author$project$SearchString$SearchString = F2(
	function (a, b) {
		return {$: 'SearchString', a: a, b: b};
	});
var $author$project$SearchString$reset = A2($author$project$SearchString$SearchString, '', true);
var $author$project$OptionsUtilities$deselectEveryOptionExceptOptionsInList = F2(
	function (optionsNotToDeselect, options) {
		return A2(
			$elm$core$List$map,
			function (option) {
				var test = function (optionNotToDeselect) {
					return A2(
						$author$project$Option$optionValuesEqual,
						optionNotToDeselect,
						$author$project$Option$getOptionValue(option));
				};
				return A2($elm$core$List$any, test, optionsNotToDeselect) ? option : $author$project$Option$deselectOption(option);
			},
			options);
	});
var $author$project$Option$isOptionValueInListOfStrings = F2(
	function (possibleValues, option) {
		return A2(
			$elm$core$List$any,
			function (possibleValue) {
				return _Utils_eq(
					$author$project$Option$getOptionValueAsString(option),
					possibleValue);
			},
			possibleValues);
	});
var $elm_community$list_extra$List$Extra$mapAccuml = F3(
	function (f, acc0, list) {
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (x, _v1) {
					var acc1 = _v1.a;
					var ys = _v1.b;
					var _v2 = A2(f, acc1, x);
					var acc2 = _v2.a;
					var y = _v2.b;
					return _Utils_Tuple2(
						acc2,
						A2($elm$core$List$cons, y, ys));
				}),
			_Utils_Tuple2(acc0, _List_Nil),
			list);
		var accFinal = _v0.a;
		var generatedList = _v0.b;
		return _Utils_Tuple2(
			accFinal,
			$elm$core$List$reverse(generatedList));
	});
var $author$project$OptionsUtilities$selectOptionInListByOptionValue = F2(
	function (value, options) {
		var nextSelectedIndex = A3(
			$elm$core$List$foldl,
			F2(
				function (selectedOption, highestIndex) {
					return (_Utils_cmp(
						$author$project$Option$getOptionSelectedIndex(selectedOption),
						highestIndex) > 0) ? $author$project$Option$getOptionSelectedIndex(selectedOption) : highestIndex;
				}),
			-1,
			options) + 1;
		return A2(
			$elm$core$List$map,
			function (option_) {
				if (A2($author$project$Option$optionValuesEqual, option_, value)) {
					switch (option_.$) {
						case 'Option':
							return A2($author$project$Option$selectOption, nextSelectedIndex, option_);
						case 'CustomOption':
							if (value.$ === 'OptionValue') {
								var valueStr = value.a;
								return A3(
									$author$project$Option$setLabelWithString,
									valueStr,
									$elm$core$Maybe$Nothing,
									A2($author$project$Option$selectOption, nextSelectedIndex, option_));
							} else {
								return A2($author$project$Option$selectOption, nextSelectedIndex, option_);
							}
						case 'EmptyOption':
							return A2($author$project$Option$selectOption, nextSelectedIndex, option_);
						default:
							return A2($author$project$Option$selectOption, nextSelectedIndex, option_);
					}
				} else {
					if ($author$project$Option$isOptionSelected(option_)) {
						return option_;
					} else {
						return $author$project$Option$removeHighlightFromOption(option_);
					}
				}
			},
			options);
	});
var $author$project$OptionsUtilities$selectOptionInList = F2(
	function (option, options) {
		return A2(
			$author$project$OptionsUtilities$selectOptionInListByOptionValue,
			$author$project$Option$getOptionValue(option),
			options);
	});
var $author$project$OptionsUtilities$selectOptionsInList = F2(
	function (optionsToSelect, options) {
		var helper = F2(
			function (newOptions, optionToSelect) {
				return _Utils_Tuple2(
					A2($author$project$OptionsUtilities$selectOptionInList, optionToSelect, newOptions),
					_List_Nil);
			});
		return A3($elm_community$list_extra$List$Extra$mapAccuml, helper, options, optionsToSelect).a;
	});
var $author$project$OptionsUtilities$selectOptionsInOptionsListByString = F2(
	function (strings, options) {
		var optionsToSelect = A2(
			$elm$core$List$filter,
			$author$project$Option$isOptionValueInListOfStrings(strings),
			options);
		return A2(
			$author$project$OptionsUtilities$deselectEveryOptionExceptOptionsInList,
			optionsToSelect,
			A2($author$project$OptionsUtilities$selectOptionsInList, optionsToSelect, options));
	});
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $elm_community$list_extra$List$Extra$gatherWith = F2(
	function (testFn, list) {
		var helper = F2(
			function (scattered, gathered) {
				helper:
				while (true) {
					if (!scattered.b) {
						return $elm$core$List$reverse(gathered);
					} else {
						var toGather = scattered.a;
						var population = scattered.b;
						var _v1 = A2(
							$elm$core$List$partition,
							testFn(toGather),
							population);
						var gathering = _v1.a;
						var remaining = _v1.b;
						var $temp$scattered = remaining,
							$temp$gathered = A2(
							$elm$core$List$cons,
							_Utils_Tuple2(toGather, gathering),
							gathered);
						scattered = $temp$scattered;
						gathered = $temp$gathered;
						continue helper;
					}
				}
			});
		return A2(helper, list, _List_Nil);
	});
var $author$project$Option$getOptionGroup = function (option) {
	switch (option.$) {
		case 'Option':
			var optionGroup = option.e;
			return optionGroup;
		case 'CustomOption':
			return $author$project$Option$NoOptionGroup;
		case 'EmptyOption':
			return $author$project$Option$NoOptionGroup;
		default:
			return $author$project$Option$NoOptionGroup;
	}
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$OptionSorting$sortOptionsByLabel = function (options) {
	return A2(
		$elm$core$List$sortBy,
		function (option) {
			return $elm$core$String$toLower(
				$author$project$OptionLabel$optionLabelToString(
					$author$project$Option$getOptionLabel(option)));
		},
		options);
};
var $author$project$PositiveInt$toInt = function (positiveInt) {
	var _int = positiveInt.a;
	return _int;
};
var $author$project$SortRank$getAutoIndexForSorting = function (sortRank) {
	switch (sortRank.$) {
		case 'Auto':
			var positiveInt = sortRank.a;
			return $author$project$PositiveInt$toInt(positiveInt);
		case 'Manual':
			var manualInt = sortRank.a;
			return $author$project$PositiveInt$toInt(manualInt);
		default:
			return 100000000;
	}
};
var $author$project$OptionLabel$getSortRank = function (optionLabel) {
	var sortRank = optionLabel.c;
	return sortRank;
};
var $author$project$OptionSorting$sortOptionsByRank = function (options) {
	return A2(
		$elm$core$List$sortBy,
		function (option) {
			return $author$project$SortRank$getAutoIndexForSorting(
				$author$project$OptionLabel$getSortRank(
					$author$project$Option$getOptionLabel(option)));
		},
		A2(
			$elm$core$List$sortBy,
			function (option) {
				return $author$project$OptionLabel$optionLabelToString(
					$author$project$Option$getOptionLabel(option));
			},
			options));
};
var $author$project$OptionSorting$sortFunction = function (optionSort_) {
	if (optionSort_.$ === 'NoSorting') {
		return $author$project$OptionSorting$sortOptionsByRank;
	} else {
		return $author$project$OptionSorting$sortOptionsByLabel;
	}
};
var $author$project$OptionSorting$sortOptions = F2(
	function (optionSort, options) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (options_) {
					return A2($author$project$OptionSorting$sortFunction, optionSort, options_);
				},
				A2(
					$elm$core$List$map,
					function (_v0) {
						var option_ = _v0.a;
						var options_ = _v0.b;
						return A2(
							$elm$core$List$append,
							_List_fromArray(
								[option_]),
							options_);
					},
					A2(
						$elm_community$list_extra$List$Extra$gatherWith,
						F2(
							function (optionA, optionB) {
								return _Utils_eq(
									$author$project$Option$getOptionGroup(optionA),
									$author$project$Option$getOptionGroup(optionB));
							}),
						options))));
	});
var $author$project$PositiveInt$lessThan = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v1.a;
		return _Utils_cmp(a, b) < 0;
	});
var $author$project$OutputStyle$minimMaxDropdownItemsNum = $author$project$PositiveInt$new(2);
var $author$project$OutputStyle$stringToMaxDropdownItems = function (str) {
	var _v0 = $author$project$PositiveInt$fromString(str);
	if (_v0.$ === 'Just') {
		var _int = _v0.a;
		return $author$project$PositiveInt$isZero(_int) ? $elm$core$Result$Ok($author$project$OutputStyle$NoLimitToDropdownItems) : (A2($author$project$PositiveInt$lessThan, _int, $author$project$OutputStyle$minimMaxDropdownItemsNum) ? $elm$core$Result$Err('Invalid value for the max-dropdown-items attribute. It needs to be greater than 2') : $elm$core$Result$Ok(
			$author$project$OutputStyle$FixedMaxDropdownItems(_int)));
	} else {
		return $elm$core$Result$Err('Invalid value for the max-dropdown-items attribute.');
	}
};
var $author$project$OptionSorting$SortByOptionLabel = {$: 'SortByOptionLabel'};
var $author$project$OptionSorting$stringToOptionSort = function (string) {
	switch (string) {
		case 'no-sorting':
			return $elm$core$Result$Ok($author$project$OptionSorting$NoSorting);
		case 'by-option-label':
			return $elm$core$Result$Ok($author$project$OptionSorting$SortByOptionLabel);
		default:
			return $elm$core$Result$Err('Sorting the options by \"' + (string + '\" is not supported'));
	}
};
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Ports$valueDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$map, $elm$core$List$singleton, $elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$andThen,
			function (listOfString) {
				if (listOfString.b && (!listOfString.b.b)) {
					return $elm$json$Json$Decode$succeed(listOfString);
				} else {
					return $elm$json$Json$Decode$fail('Only 1 value is allowed when in single select mode.');
				}
			},
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
			$elm$json$Json$Decode$null(_List_Nil)
		]));
var $author$project$Ports$valuesDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$map, $elm$core$List$singleton, $elm$json$Json$Decode$string)
		]));
var $author$project$SelectedValueEncoding$stringToValueStrings = F2(
	function (selectedValueEncoding, valuesString) {
		if ((valuesString === '') && _Utils_eq(selectedValueEncoding, $author$project$SelectedValueEncoding$CommaSeperated)) {
			return $elm$core$Result$Ok(_List_Nil);
		} else {
			if ((valuesString === '') && _Utils_eq(selectedValueEncoding, $author$project$SelectedValueEncoding$JsonEncoded)) {
				return $elm$core$Result$Ok(_List_Nil);
			} else {
				if (selectedValueEncoding.$ === 'CommaSeperated') {
					return $elm$core$Result$Ok(
						A2($elm$core$String$split, ',', valuesString));
				} else {
					return A2(
						$elm$core$Result$andThen,
						function (decodedValueString) {
							return A2(
								$elm$core$Result$mapError,
								function (error) {
									return $elm$json$Json$Decode$errorToString(error);
								},
								A2(
									$elm$json$Json$Decode$decodeString,
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[$author$project$Ports$valuesDecoder, $author$project$Ports$valueDecoder])),
									decodedValueString));
						},
						A2(
							$elm$core$Result$fromMaybe,
							'Unable to do a percent decode on the selected value',
							$elm$url$Url$percentDecode(valuesString)));
				}
			}
		}
	});
var $author$project$RightSlot$ShowAddAndRemoveButtons = {$: 'ShowAddAndRemoveButtons'};
var $author$project$RightSlot$ShowAddButton = {$: 'ShowAddButton'};
var $author$project$OptionValue$isEmpty = function (optionValue) {
	if (optionValue.$ === 'OptionValue') {
		return false;
	} else {
		return true;
	}
};
var $author$project$RightSlot$updateRightSlotForDatalist = function (selectedOptions) {
	var showRemoveButtons = $elm$core$List$length(selectedOptions) > 1;
	var showAddButtons = A2(
		$elm$core$List$any,
		function (option) {
			return !$author$project$OptionValue$isEmpty(
				$author$project$Option$getOptionValue(option));
		},
		selectedOptions);
	return (showAddButtons && (!showRemoveButtons)) ? $author$project$RightSlot$ShowAddButton : ((showAddButtons && showRemoveButtons) ? $author$project$RightSlot$ShowAddAndRemoveButtons : $author$project$RightSlot$ShowNothing);
};
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$MuchSelect$init = function (flags) {
	var selectedValueEncoding = A2(
		$elm$core$Result$withDefault,
		$author$project$SelectedValueEncoding$defaultSelectedValueEncoding,
		$author$project$SelectedValueEncoding$fromMaybeString(flags.selectedValueEncoding));
	var optionSort = A2(
		$elm$core$Result$withDefault,
		$author$project$OptionSorting$NoSorting,
		$author$project$OptionSorting$stringToOptionSort(flags.optionSort));
	var _v0 = function () {
		var _v1 = $author$project$TransformAndValidate$decode(flags.transformationAndValidationJson);
		if (_v1.$ === 'Ok') {
			var value = _v1.a;
			return _Utils_Tuple2(value, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v1.a;
			return _Utils_Tuple2(
				$author$project$TransformAndValidate$empty,
				$author$project$MuchSelect$ReportErrorMessage(
					$elm$json$Json$Decode$errorToString(error)));
		}
	}();
	var valueTransformationAndValidation = _v0.a;
	var valueTransformationAndValidationErrorEffect = _v0.b;
	var _v2 = function () {
		var _v3 = flags.maxDropdownItems;
		if (_v3.$ === 'Just') {
			var str = _v3.a;
			var _v4 = $author$project$PositiveInt$fromString(str);
			if (_v4.$ === 'Just') {
				var _int = _v4.a;
				return $author$project$PositiveInt$isZero(_int) ? _Utils_Tuple2($author$project$OutputStyle$NoMinimumToSearchStringLength, $author$project$MuchSelect$NoEffect) : _Utils_Tuple2(
					$author$project$OutputStyle$FixedSearchStringMinimumLength(_int),
					$author$project$MuchSelect$NoEffect);
			} else {
				return _Utils_Tuple2(
					$author$project$OutputStyle$defaultSearchStringMinimumLength,
					$author$project$MuchSelect$ReportErrorMessage('Invalid value for the search-string-minimum-length attribute.'));
			}
		} else {
			return _Utils_Tuple2($author$project$OutputStyle$defaultSearchStringMinimumLength, $author$project$MuchSelect$NoEffect);
		}
	}();
	var searchStringMinimumLength = _v2.a;
	var searchStringMinimumLengthErrorEffect = _v2.b;
	var _v5 = function () {
		var _v6 = flags.maxDropdownItems;
		if (_v6.$ === 'Just') {
			var str = _v6.a;
			var _v7 = $author$project$OutputStyle$stringToMaxDropdownItems(str);
			if (_v7.$ === 'Ok') {
				var value = _v7.a;
				return _Utils_Tuple2(value, $author$project$MuchSelect$NoEffect);
			} else {
				var error = _v7.a;
				return _Utils_Tuple2(
					$author$project$OutputStyle$defaultMaxDropdownItems,
					$author$project$MuchSelect$ReportErrorMessage(error));
			}
		} else {
			return _Utils_Tuple2($author$project$OutputStyle$defaultMaxDropdownItems, $author$project$MuchSelect$NoEffect);
		}
	}();
	var maxDropdownItems = _v5.a;
	var maxDropdownItemsErrorEffect = _v5.b;
	var _v8 = function () {
		var _v9 = $author$project$SelectionMode$makeSelectionConfig(flags.isEventsOnly)(flags.disabled)(flags.allowMultiSelect)(flags.allowCustomOptions)(flags.outputStyle)(flags.placeholder)(flags.customOptionHint)(flags.enableMultiSelectSingleItemRemoval)(maxDropdownItems)(flags.selectedItemStaysInPlace)(searchStringMinimumLength)(flags.showDropdownFooter)(valueTransformationAndValidation);
		if (_v9.$ === 'Ok') {
			var value = _v9.a;
			return _Utils_Tuple2(value, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v9.a;
			return _Utils_Tuple2(
				$author$project$SelectionMode$defaultSelectionConfig,
				$author$project$MuchSelect$ReportErrorMessage(error));
		}
	}();
	var selectionConfig = _v8.a;
	var selectionConfigErrorEffect = _v8.b;
	var _v10 = function () {
		var _v11 = A2($author$project$SelectedValueEncoding$stringToValueStrings, selectedValueEncoding, flags.selectedValue);
		if (_v11.$ === 'Ok') {
			var values = _v11.a;
			return _Utils_Tuple2(values, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v11.a;
			return _Utils_Tuple2(
				_List_Nil,
				$author$project$MuchSelect$ReportErrorMessage(error));
		}
	}();
	var initialValues = _v10.a;
	var initialValueErrEffect = _v10.b;
	var _v12 = function () {
		var _v13 = A2(
			$elm$json$Json$Decode$decodeString,
			A2(
				$author$project$Option$optionsDecoder,
				$author$project$OptionDisplay$MatureOption,
				$author$project$SelectionMode$getOutputStyle(selectionConfig)),
			flags.optionsJson);
		if (_v13.$ === 'Ok') {
			var options = _v13.a;
			var _v14 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (_v14.$ === 'SingleSelect') {
				var _v15 = $elm$core$List$head(initialValues);
				if (_v15.$ === 'Just') {
					var initialValueStr_ = _v15.a;
					if (A2(
						$author$project$OptionsUtilities$isOptionValueInListOfOptionsByValue,
						$author$project$OptionValue$stringToOptionValue(initialValueStr_),
						options)) {
						var optionsWithUniqueValues = A2($elm_community$list_extra$List$Extra$uniqueBy, $author$project$Option$getOptionValueAsString, options);
						return _Utils_Tuple2(
							A2($author$project$OptionsUtilities$selectOptionsInOptionsListByString, initialValues, optionsWithUniqueValues),
							$author$project$MuchSelect$NoEffect);
					} else {
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(
									$author$project$Option$selectOption,
									0,
									A2($author$project$Option$newOption, initialValueStr_, $elm$core$Maybe$Nothing)),
								options),
							$author$project$MuchSelect$NoEffect);
					}
				} else {
					var optionsWithUniqueValues = A2($elm_community$list_extra$List$Extra$uniqueBy, $author$project$Option$getOptionValueAsString, options);
					return _Utils_Tuple2(optionsWithUniqueValues, $author$project$MuchSelect$NoEffect);
				}
			} else {
				var optionsWithInitialValues = A2(
					$author$project$OptionsUtilities$addAndSelectOptionsInOptionsListByString,
					initialValues,
					A2(
						$elm$core$List$filter,
						A2($elm$core$Basics$composeL, $elm$core$Basics$not, $author$project$Option$isEmptyOption),
						options));
				return _Utils_Tuple2(optionsWithInitialValues, $author$project$MuchSelect$NoEffect);
			}
		} else {
			var error = _v13.a;
			return _Utils_Tuple2(
				_List_Nil,
				$author$project$MuchSelect$ReportErrorMessage(
					$elm$json$Json$Decode$errorToString(error)));
		}
	}();
	var optionsWithInitialValueSelected = _v12.a;
	var errorEffect = _v12.b;
	var optionsWithInitialValueSelectedSorted = function () {
		var _v19 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
		if (_v19.$ === 'CustomHtml') {
			return A2($author$project$OptionSorting$sortOptions, optionSort, optionsWithInitialValueSelected);
		} else {
			return $author$project$OptionsUtilities$organizeNewDatalistOptions(optionsWithInitialValueSelected);
		}
	}();
	return _Utils_Tuple2(
		{
			focusedIndex: 0,
			initialValue: initialValues,
			optionSort: A2(
				$elm$core$Result$withDefault,
				$author$project$OptionSorting$NoSorting,
				$author$project$OptionSorting$stringToOptionSort(flags.optionSort)),
			options: optionsWithInitialValueSelectedSorted,
			rightSlot: function () {
				if (flags.loading) {
					return $author$project$RightSlot$ShowLoadingIndicator;
				} else {
					var _v16 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
					if (_v16.$ === 'CustomHtml') {
						var _v17 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
						if (_v17.$ === 'SingleSelect') {
							return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
						} else {
							return $author$project$OptionsUtilities$hasSelectedOption(optionsWithInitialValueSelected) ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
						}
					} else {
						var _v18 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
						if (_v18.$ === 'SingleSelect') {
							return $author$project$RightSlot$ShowNothing;
						} else {
							return $author$project$RightSlot$updateRightSlotForDatalist(optionsWithInitialValueSelectedSorted);
						}
					}
				}
			}(),
			searchString: $author$project$SearchString$reset,
			searchStringBounce: $grotsev$elm_debouncer$Bounce$init,
			searchStringDebounceLength: $author$project$MuchSelect$getDebouceDelayForSearch(
				$elm$core$List$length(optionsWithInitialValueSelectedSorted)),
			searchStringNonce: 0,
			selectedValueEncoding: selectedValueEncoding,
			selectionConfig: selectionConfig,
			valueCasing: A2($author$project$MuchSelect$ValueCasing, 100, 45)
		},
		$author$project$MuchSelect$batch(
			_List_fromArray(
				[
					errorEffect,
					maxDropdownItemsErrorEffect,
					searchStringMinimumLengthErrorEffect,
					initialValueErrEffect,
					$author$project$MuchSelect$ReportReady,
					A4(
					$author$project$MuchSelect$makeEffectsForInitialValue,
					$author$project$SelectionMode$getEventMode(selectionConfig),
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					selectedValueEncoding,
					$author$project$OptionsUtilities$selectedOptions(optionsWithInitialValueSelected)),
					$author$project$MuchSelect$UpdateOptionsInWebWorker,
					valueTransformationAndValidationErrorEffect,
					selectionConfigErrorEffect
				])));
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$MuchSelect$SearchStringSteady = {$: 'SearchStringSteady'};
var $author$project$Ports$allOptions = _Platform_outgoingPort('allOptions', $elm$core$Basics$identity);
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Ports$blurInput = _Platform_outgoingPort(
	'blurInput',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$customOptionSelected = _Platform_outgoingPort(
	'customOptionSelected',
	$elm$json$Json$Encode$list($elm$json$Json$Encode$string));
var $elm$core$Process$sleep = _Process_sleep;
var $grotsev$elm_debouncer$Bounce$delay = F2(
	function (milliseconds, msg) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$always(msg),
			$elm$core$Process$sleep(milliseconds));
	});
var $author$project$Ports$dumpConfigState = _Platform_outgoingPort('dumpConfigState', $elm$core$Basics$identity);
var $author$project$Ports$dumpSelectedValues = _Platform_outgoingPort('dumpSelectedValues', $elm$core$Basics$identity);
var $author$project$LightDomChange$encode = function (lightDomChange) {
	switch (lightDomChange.$) {
		case 'AddUpdateAttribute':
			var name = lightDomChange.a;
			var value = lightDomChange.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'changeType',
						$elm$json$Json$Encode$string('add-update-attribute')),
						_Utils_Tuple2(
						'name',
						$elm$json$Json$Encode$string(name)),
						_Utils_Tuple2(
						'value',
						$elm$json$Json$Encode$string(value))
					]));
		case 'RemoveAttribute':
			var name = lightDomChange.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'changeType',
						$elm$json$Json$Encode$string('remove-attribute')),
						_Utils_Tuple2(
						'name',
						$elm$json$Json$Encode$string(name))
					]));
		default:
			var data = lightDomChange.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'changeType',
						$elm$json$Json$Encode$string('update-selected-value')),
						_Utils_Tuple2('data', data)
					]));
	}
};
var $author$project$Ports$errorMessage = _Platform_outgoingPort('errorMessage', $elm$json$Json$Encode$string);
var $author$project$Ports$focusInput = _Platform_outgoingPort(
	'focusInput',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$initialValueSet = _Platform_outgoingPort('initialValueSet', $elm$core$Basics$identity);
var $author$project$Ports$inputBlurred = _Platform_outgoingPort(
	'inputBlurred',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$inputFocused = _Platform_outgoingPort(
	'inputFocused',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$inputKeyUp = _Platform_outgoingPort('inputKeyUp', $elm$json$Json$Encode$string);
var $author$project$Ports$invalidValue = _Platform_outgoingPort('invalidValue', $elm$core$Basics$identity);
var $author$project$Ports$lightDomChange = _Platform_outgoingPort('lightDomChange', $elm$core$Basics$identity);
var $author$project$Ports$muchSelectIsReady = _Platform_outgoingPort(
	'muchSelectIsReady',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$optionDeselected = _Platform_outgoingPort('optionDeselected', $elm$core$Basics$identity);
var $author$project$Ports$optionSelected = _Platform_outgoingPort('optionSelected', $elm$core$Basics$identity);
var $author$project$Ports$optionsUpdated = _Platform_outgoingPort('optionsUpdated', $elm$json$Json$Encode$bool);
var $author$project$Ports$scrollDropdownToElement = _Platform_outgoingPort('scrollDropdownToElement', $elm$json$Json$Encode$string);
var $author$project$Ports$searchOptionsWithWebWorker = _Platform_outgoingPort('searchOptionsWithWebWorker', $elm$core$Basics$identity);
var $author$project$Ports$sendCustomValidationRequest = _Platform_outgoingPort(
	'sendCustomValidationRequest',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$int(b)
				]));
	});
var $author$project$Ports$updateOptionsFromDom = _Platform_outgoingPort(
	'updateOptionsFromDom',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$updateOptionsInWebWorker = _Platform_outgoingPort(
	'updateOptionsInWebWorker',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$valueChangedMultiSelectSelect = _Platform_outgoingPort('valueChangedMultiSelectSelect', $elm$core$Basics$identity);
var $author$project$Ports$valueChangedSingleSelect = _Platform_outgoingPort('valueChangedSingleSelect', $elm$core$Basics$identity);
var $author$project$Ports$valueCleared = _Platform_outgoingPort(
	'valueCleared',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$MuchSelect$perform = function (effect) {
	switch (effect.$) {
		case 'NoEffect':
			return $elm$core$Platform$Cmd$none;
		case 'Batch':
			var effects = effect.a;
			return $elm$core$Platform$Cmd$batch(
				A2($elm$core$List$map, $author$project$MuchSelect$perform, effects));
		case 'FocusInput':
			return $author$project$Ports$focusInput(_Utils_Tuple0);
		case 'BlurInput':
			return $author$project$Ports$blurInput(_Utils_Tuple0);
		case 'InputHasBeenBlurred':
			return $author$project$Ports$inputBlurred(_Utils_Tuple0);
		case 'SearchStringTouched':
			var milSeconds = effect.a;
			return A2($grotsev$elm_debouncer$Bounce$delay, milSeconds, $author$project$MuchSelect$SearchStringSteady);
		case 'InputHasBeenFocused':
			return $author$project$Ports$inputFocused(_Utils_Tuple0);
		case 'InputHasBeenKeyUp':
			var string = effect.a;
			return $author$project$Ports$inputKeyUp(string);
		case 'UpdateOptionsInWebWorker':
			return $author$project$Ports$updateOptionsInWebWorker(_Utils_Tuple0);
		case 'SearchOptionsWithWebWorker':
			var value = effect.a;
			return $author$project$Ports$searchOptionsWithWebWorker(value);
		case 'ReportValueChanged':
			var value = effect.a;
			var selectionMode = effect.b;
			if (selectionMode.$ === 'SingleSelect') {
				return $author$project$Ports$valueChangedSingleSelect(value);
			} else {
				return $author$project$Ports$valueChangedMultiSelectSelect(value);
			}
		case 'ValueCleared':
			return $author$project$Ports$valueCleared(_Utils_Tuple0);
		case 'InvalidValue':
			var value = effect.a;
			return $author$project$Ports$invalidValue(value);
		case 'CustomOptionSelected':
			var strings = effect.a;
			return $author$project$Ports$customOptionSelected(strings);
		case 'ReportOptionSelected':
			var value = effect.a;
			return $author$project$Ports$optionSelected(value);
		case 'ReportOptionDeselected':
			var value = effect.a;
			return $author$project$Ports$optionDeselected(value);
		case 'OptionsUpdated':
			var bool = effect.a;
			return $author$project$Ports$optionsUpdated(bool);
		case 'SendCustomValidationRequest':
			var _v2 = effect.a;
			var string = _v2.a;
			var _int = _v2.b;
			return $author$project$Ports$sendCustomValidationRequest(
				_Utils_Tuple2(string, _int));
		case 'ReportErrorMessage':
			var string = effect.a;
			return $author$project$Ports$errorMessage(string);
		case 'ReportReady':
			return $author$project$Ports$muchSelectIsReady(_Utils_Tuple0);
		case 'FetchOptionsFromDom':
			return $author$project$Ports$updateOptionsFromDom(_Utils_Tuple0);
		case 'ScrollDownToElement':
			var string = effect.a;
			return $author$project$Ports$scrollDropdownToElement(string);
		case 'ReportAllOptions':
			var value = effect.a;
			return $author$project$Ports$allOptions(value);
		case 'ReportInitialValueSet':
			var value = effect.a;
			return $author$project$Ports$initialValueSet(value);
		case 'DumpConfigState':
			var value = effect.a;
			return $author$project$Ports$dumpConfigState(value);
		case 'DumpSelectedValues':
			var value = effect.a;
			return $author$project$Ports$dumpSelectedValues(value);
		default:
			var lightDomChange_ = effect.a;
			return $author$project$Ports$lightDomChange(
				$author$project$LightDomChange$encode(lightDomChange_));
	}
};
var $author$project$MuchSelect$AddOptions = function (a) {
	return {$: 'AddOptions', a: a};
};
var $author$project$MuchSelect$AllowCustomOptionsChanged = function (a) {
	return {$: 'AllowCustomOptionsChanged', a: a};
};
var $author$project$MuchSelect$AttributeChanged = function (a) {
	return {$: 'AttributeChanged', a: a};
};
var $author$project$MuchSelect$AttributeRemoved = function (a) {
	return {$: 'AttributeRemoved', a: a};
};
var $author$project$MuchSelect$CustomOptionHintChanged = function (a) {
	return {$: 'CustomOptionHintChanged', a: a};
};
var $author$project$MuchSelect$CustomValidationResponse = function (a) {
	return {$: 'CustomValidationResponse', a: a};
};
var $author$project$MuchSelect$DeselectOption = function (a) {
	return {$: 'DeselectOption', a: a};
};
var $author$project$MuchSelect$DisabledAttributeChanged = function (a) {
	return {$: 'DisabledAttributeChanged', a: a};
};
var $author$project$MuchSelect$LoadingAttributeChanged = function (a) {
	return {$: 'LoadingAttributeChanged', a: a};
};
var $author$project$MuchSelect$MaxDropdownItemsChanged = function (a) {
	return {$: 'MaxDropdownItemsChanged', a: a};
};
var $author$project$MuchSelect$MultiSelectAttributeChanged = function (a) {
	return {$: 'MultiSelectAttributeChanged', a: a};
};
var $author$project$MuchSelect$MultiSelectSingleItemRemovalAttributeChanged = function (a) {
	return {$: 'MultiSelectSingleItemRemovalAttributeChanged', a: a};
};
var $author$project$MuchSelect$OptionSortingChanged = function (a) {
	return {$: 'OptionSortingChanged', a: a};
};
var $author$project$MuchSelect$OptionsReplaced = function (a) {
	return {$: 'OptionsReplaced', a: a};
};
var $author$project$MuchSelect$OutputStyleChanged = function (a) {
	return {$: 'OutputStyleChanged', a: a};
};
var $author$project$MuchSelect$PlaceholderAttributeChanged = function (a) {
	return {$: 'PlaceholderAttributeChanged', a: a};
};
var $author$project$MuchSelect$RemoveOptions = function (a) {
	return {$: 'RemoveOptions', a: a};
};
var $author$project$MuchSelect$RequestAllOptions = {$: 'RequestAllOptions'};
var $author$project$MuchSelect$RequestConfigState = {$: 'RequestConfigState'};
var $author$project$MuchSelect$RequestSelectedValues = {$: 'RequestSelectedValues'};
var $author$project$MuchSelect$SearchStringMinimumLengthAttributeChanged = function (a) {
	return {$: 'SearchStringMinimumLengthAttributeChanged', a: a};
};
var $author$project$MuchSelect$SelectOption = function (a) {
	return {$: 'SelectOption', a: a};
};
var $author$project$MuchSelect$SelectedItemStaysInPlaceChanged = function (a) {
	return {$: 'SelectedItemStaysInPlaceChanged', a: a};
};
var $author$project$MuchSelect$SelectedValueEncodingChanged = function (a) {
	return {$: 'SelectedValueEncodingChanged', a: a};
};
var $author$project$MuchSelect$ShowDropdownFooterChanged = function (a) {
	return {$: 'ShowDropdownFooterChanged', a: a};
};
var $author$project$MuchSelect$UpdateSearchResultsForOptions = function (a) {
	return {$: 'UpdateSearchResultsForOptions', a: a};
};
var $author$project$MuchSelect$UpdateTransformationAndValidation = function (a) {
	return {$: 'UpdateTransformationAndValidation', a: a};
};
var $author$project$MuchSelect$ValueCasingWidthUpdate = function (a) {
	return {$: 'ValueCasingWidthUpdate', a: a};
};
var $author$project$MuchSelect$ValueChanged = function (a) {
	return {$: 'ValueChanged', a: a};
};
var $author$project$Ports$addOptionsReceiver = _Platform_incomingPort('addOptionsReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$allowCustomOptionsReceiver = _Platform_incomingPort(
	'allowCustomOptionsReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool)));
var $author$project$Ports$attributeChanged = _Platform_incomingPort(
	'attributeChanged',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string)));
var $author$project$Ports$attributeRemoved = _Platform_incomingPort('attributeRemoved', $elm$json$Json$Decode$string);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$Ports$customOptionHintReceiver = _Platform_incomingPort('customOptionHintReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$customValidationReceiver = _Platform_incomingPort('customValidationReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$deselectOptionReceiver = _Platform_incomingPort('deselectOptionReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$disableChangedReceiver = _Platform_incomingPort('disableChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$loadingChangedReceiver = _Platform_incomingPort('loadingChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$maxDropdownItemsChangedReceiver = _Platform_incomingPort('maxDropdownItemsChangedReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$multiSelectChangedReceiver = _Platform_incomingPort('multiSelectChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$multiSelectSingleItemRemovalChangedReceiver = _Platform_incomingPort('multiSelectSingleItemRemovalChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$optionSortingChangedReceiver = _Platform_incomingPort('optionSortingChangedReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$optionsReplacedReceiver = _Platform_incomingPort('optionsReplacedReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$outputStyleChangedReceiver = _Platform_incomingPort('outputStyleChangedReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$placeholderChangedReceiver = _Platform_incomingPort(
	'placeholderChangedReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool)));
var $author$project$Ports$removeOptionsReceiver = _Platform_incomingPort('removeOptionsReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$requestAllOptionsReceiver = _Platform_incomingPort(
	'requestAllOptionsReceiver',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $author$project$Ports$requestConfigState = _Platform_incomingPort(
	'requestConfigState',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $author$project$Ports$requestSelectedValues = _Platform_incomingPort(
	'requestSelectedValues',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $author$project$Ports$searchStringMinimumLengthChangedReceiver = _Platform_incomingPort('searchStringMinimumLengthChangedReceiver', $elm$json$Json$Decode$int);
var $author$project$Ports$selectOptionReceiver = _Platform_incomingPort('selectOptionReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$selectedItemStaysInPlaceChangedReceiver = _Platform_incomingPort('selectedItemStaysInPlaceChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$selectedValueEncodingChangeReceiver = _Platform_incomingPort('selectedValueEncodingChangeReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$showDropdownFooterChangedReceiver = _Platform_incomingPort('showDropdownFooterChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$transformationAndValidationReceiver = _Platform_incomingPort('transformationAndValidationReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$updateSearchResultDataWithWebWorkerReceiver = _Platform_incomingPort('updateSearchResultDataWithWebWorkerReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$valueCasingDimensionsChangedReceiver = _Platform_incomingPort(
	'valueCasingDimensionsChangedReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (height) {
					return $elm$json$Json$Decode$succeed(
						{height: height, width: width});
				},
				A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$float));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$float)));
var $author$project$Ports$valueChangedReceiver = _Platform_incomingPort('valueChangedReceiver', $elm$json$Json$Decode$value);
var $author$project$MuchSelect$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Ports$addOptionsReceiver($author$project$MuchSelect$AddOptions),
				$author$project$Ports$allowCustomOptionsReceiver($author$project$MuchSelect$AllowCustomOptionsChanged),
				$author$project$Ports$deselectOptionReceiver($author$project$MuchSelect$DeselectOption),
				$author$project$Ports$disableChangedReceiver($author$project$MuchSelect$DisabledAttributeChanged),
				$author$project$Ports$loadingChangedReceiver($author$project$MuchSelect$LoadingAttributeChanged),
				$author$project$Ports$maxDropdownItemsChangedReceiver($author$project$MuchSelect$MaxDropdownItemsChanged),
				$author$project$Ports$multiSelectChangedReceiver($author$project$MuchSelect$MultiSelectAttributeChanged),
				$author$project$Ports$multiSelectSingleItemRemovalChangedReceiver($author$project$MuchSelect$MultiSelectSingleItemRemovalAttributeChanged),
				$author$project$Ports$optionsReplacedReceiver($author$project$MuchSelect$OptionsReplaced),
				$author$project$Ports$optionSortingChangedReceiver($author$project$MuchSelect$OptionSortingChanged),
				$author$project$Ports$placeholderChangedReceiver($author$project$MuchSelect$PlaceholderAttributeChanged),
				$author$project$Ports$removeOptionsReceiver($author$project$MuchSelect$RemoveOptions),
				$author$project$Ports$requestAllOptionsReceiver(
				function (_v1) {
					return $author$project$MuchSelect$RequestAllOptions;
				}),
				$author$project$Ports$searchStringMinimumLengthChangedReceiver($author$project$MuchSelect$SearchStringMinimumLengthAttributeChanged),
				$author$project$Ports$selectOptionReceiver($author$project$MuchSelect$SelectOption),
				$author$project$Ports$selectedItemStaysInPlaceChangedReceiver($author$project$MuchSelect$SelectedItemStaysInPlaceChanged),
				$author$project$Ports$showDropdownFooterChangedReceiver($author$project$MuchSelect$ShowDropdownFooterChanged),
				$author$project$Ports$valueCasingDimensionsChangedReceiver($author$project$MuchSelect$ValueCasingWidthUpdate),
				$author$project$Ports$valueChangedReceiver($author$project$MuchSelect$ValueChanged),
				$author$project$Ports$outputStyleChangedReceiver($author$project$MuchSelect$OutputStyleChanged),
				$author$project$Ports$updateSearchResultDataWithWebWorkerReceiver($author$project$MuchSelect$UpdateSearchResultsForOptions),
				$author$project$Ports$customValidationReceiver($author$project$MuchSelect$CustomValidationResponse),
				$author$project$Ports$transformationAndValidationReceiver($author$project$MuchSelect$UpdateTransformationAndValidation),
				$author$project$Ports$attributeChanged($author$project$MuchSelect$AttributeChanged),
				$author$project$Ports$attributeRemoved($author$project$MuchSelect$AttributeRemoved),
				$author$project$Ports$customOptionHintReceiver($author$project$MuchSelect$CustomOptionHintChanged),
				$author$project$Ports$requestConfigState(
				function (_v2) {
					return $author$project$MuchSelect$RequestConfigState;
				}),
				$author$project$Ports$requestSelectedValues(
				function (_v3) {
					return $author$project$MuchSelect$RequestSelectedValues;
				}),
				$author$project$Ports$selectedValueEncodingChangeReceiver($author$project$MuchSelect$SelectedValueEncodingChanged)
			]));
};
var $author$project$LightDomChange$AddUpdateAttribute = F2(
	function (a, b) {
		return {$: 'AddUpdateAttribute', a: a, b: b};
	});
var $author$project$MuchSelect$BlurInput = {$: 'BlurInput'};
var $author$project$MuchSelect$DumpConfigState = function (a) {
	return {$: 'DumpConfigState', a: a};
};
var $author$project$MuchSelect$DumpSelectedValues = function (a) {
	return {$: 'DumpSelectedValues', a: a};
};
var $author$project$MuchSelect$FetchOptionsFromDom = {$: 'FetchOptionsFromDom'};
var $author$project$MuchSelect$FocusInput = {$: 'FocusInput'};
var $author$project$RightSlot$InFocusTransition = {$: 'InFocusTransition'};
var $author$project$MuchSelect$InputHasBeenBlurred = {$: 'InputHasBeenBlurred'};
var $author$project$MuchSelect$InputHasBeenFocused = {$: 'InputHasBeenFocused'};
var $author$project$MuchSelect$InputHasBeenKeyUp = F2(
	function (a, b) {
		return {$: 'InputHasBeenKeyUp', a: a, b: b};
	});
var $author$project$TransformAndValidate$InputHasBeenValidated = {$: 'InputHasBeenValidated'};
var $author$project$TransformAndValidate$InputHasFailedValidation = {$: 'InputHasFailedValidation'};
var $author$project$TransformAndValidate$InputHasValidationPending = {$: 'InputHasValidationPending'};
var $author$project$TransformAndValidate$InputValidationIsNotHappening = {$: 'InputValidationIsNotHappening'};
var $author$project$OptionDisplay$NewOption = {$: 'NewOption'};
var $author$project$MuchSelect$OptionsUpdated = function (a) {
	return {$: 'OptionsUpdated', a: a};
};
var $author$project$MuchSelect$ReportAllOptions = function (a) {
	return {$: 'ReportAllOptions', a: a};
};
var $author$project$MuchSelect$ReportValueChanged = F2(
	function (a, b) {
		return {$: 'ReportValueChanged', a: a, b: b};
	});
var $author$project$MuchSelect$ScrollDownToElement = function (a) {
	return {$: 'ScrollDownToElement', a: a};
};
var $author$project$MuchSelect$SearchOptionsWithWebWorker = function (a) {
	return {$: 'SearchOptionsWithWebWorker', a: a};
};
var $author$project$MuchSelect$SearchStringTouched = function (a) {
	return {$: 'SearchStringTouched', a: a};
};
var $author$project$OptionDisplay$OptionActivated = {$: 'OptionActivated'};
var $author$project$OptionDisplay$activate = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return optionDisplay;
		case 'OptionHidden':
			return optionDisplay;
		case 'OptionSelected':
			return optionDisplay;
		case 'OptionSelectedAndInvalid':
			return optionDisplay;
		case 'OptionSelectedPendingValidation':
			return optionDisplay;
		case 'OptionSelectedHighlighted':
			return optionDisplay;
		case 'OptionHighlighted':
			return $author$project$OptionDisplay$OptionActivated;
		case 'OptionActivated':
			return optionDisplay;
		default:
			return optionDisplay;
	}
};
var $author$project$Option$activateOption = function (option) {
	return A2(
		$author$project$Option$setOptionDisplay,
		$author$project$OptionDisplay$activate(
			$author$project$Option$getOptionDisplay(option)),
		option);
};
var $author$project$OptionsUtilities$activateOptionInListByOptionValue = F2(
	function (value, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				if (A2($author$project$Option$optionValuesEqual, option_, value)) {
					switch (option_.$) {
						case 'Option':
							return $author$project$Option$activateOption(option_);
						case 'CustomOption':
							return $author$project$Option$activateOption(option_);
						case 'EmptyOption':
							return $author$project$Option$activateOption(option_);
						default:
							return option_;
					}
				} else {
					if ($author$project$Option$isOptionSelected(option_)) {
						return option_;
					} else {
						return $author$project$Option$removeHighlightFromOption(option_);
					}
				}
			},
			options);
	});
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $author$project$OptionsUtilities$findOptionByOptionValue = F2(
	function (optionValue, options) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionValue(option),
					optionValue);
			},
			options);
	});
var $author$project$OptionsUtilities$findOptionByOptionUsingOptionValue = F2(
	function (option, options) {
		return A2(
			$author$project$OptionsUtilities$findOptionByOptionValue,
			$author$project$Option$getOptionValue(option),
			options);
	});
var $author$project$OptionsUtilities$isOptionInListOfOptionsByValue = F2(
	function (option, options) {
		return A2(
			$author$project$OptionsUtilities$isOptionValueInListOfOptionsByValue,
			$author$project$Option$getOptionValue(option),
			options);
	});
var $author$project$Option$getOptionDescription = function (option) {
	switch (option.$) {
		case 'Option':
			var optionDescription = option.d;
			return optionDescription;
		case 'CustomOption':
			return $author$project$Option$NoDescription;
		case 'EmptyOption':
			return $author$project$Option$NoDescription;
		default:
			return $author$project$Option$NoDescription;
	}
};
var $author$project$Option$orOptionDescriptions = F2(
	function (optionA, optionB) {
		var optionDescriptionB = $author$project$Option$getOptionDescription(optionB);
		var optionDescriptionA = $author$project$Option$getOptionDescription(optionA);
		if (optionDescriptionA.$ === 'OptionDescription') {
			return optionDescriptionA;
		} else {
			if (optionDescriptionB.$ === 'OptionDescription') {
				return optionDescriptionB;
			} else {
				return optionDescriptionB;
			}
		}
	});
var $author$project$Option$orOptionGroup = F2(
	function (optionA, optionB) {
		var _v0 = $author$project$Option$getOptionGroup(optionA);
		if (_v0.$ === 'OptionGroup') {
			return $author$project$Option$getOptionGroup(optionA);
		} else {
			var _v1 = $author$project$Option$getOptionGroup(optionB);
			if (_v1.$ === 'OptionGroup') {
				return $author$project$Option$getOptionGroup(optionB);
			} else {
				return $author$project$Option$getOptionGroup(optionA);
			}
		}
	});
var $author$project$Option$isOptionValueEqualToOptionLabel = function (option) {
	var optionValueString = $author$project$Option$getOptionValueAsString(option);
	var optionLabelString = $author$project$OptionLabel$optionLabelToString(
		$author$project$Option$getOptionLabel(option));
	return _Utils_eq(optionValueString, optionLabelString);
};
var $author$project$Option$orOptionLabel = F2(
	function (optionA, optionB) {
		return $author$project$Option$isOptionValueEqualToOptionLabel(optionA) ? ($author$project$Option$isOptionValueEqualToOptionLabel(optionB) ? $author$project$Option$getOptionLabel(optionA) : $author$project$Option$getOptionLabel(optionB)) : $author$project$Option$getOptionLabel(optionA);
	});
var $author$project$Option$orSelectedIndex = F2(
	function (optionA, optionB) {
		return _Utils_eq(
			$author$project$Option$getOptionSelectedIndex(optionA),
			$author$project$Option$getOptionSelectedIndex(optionB)) ? $author$project$Option$getOptionSelectedIndex(optionA) : ((_Utils_cmp(
			$author$project$Option$getOptionSelectedIndex(optionA),
			$author$project$Option$getOptionSelectedIndex(optionB)) > 0) ? $author$project$Option$getOptionSelectedIndex(optionA) : $author$project$Option$getOptionSelectedIndex(optionB));
	});
var $author$project$Option$setDescription = F2(
	function (description, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				var label = option.b;
				var optionValue = option.c;
				var group = option.e;
				var search = option.f;
				return A6($author$project$Option$Option, optionDisplay, label, optionValue, description, group, search);
			case 'CustomOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				var optionValue = option.c;
				var search = option.d;
				return A4($author$project$Option$CustomOption, optionDisplay, optionLabel, optionValue, search);
			case 'EmptyOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				return A2($author$project$Option$EmptyOption, optionDisplay, optionLabel);
			default:
				return option;
		}
	});
var $author$project$Option$setGroup = F2(
	function (optionGroup, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				var label = option.b;
				var optionValue = option.c;
				var description = option.d;
				var search = option.f;
				return A6($author$project$Option$Option, optionDisplay, label, optionValue, description, optionGroup, search);
			case 'CustomOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				var optionValue = option.c;
				var search = option.d;
				return A4($author$project$Option$CustomOption, optionDisplay, optionLabel, optionValue, search);
			case 'EmptyOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				return A2($author$project$Option$EmptyOption, optionDisplay, optionLabel);
			default:
				return option;
		}
	});
var $author$project$Option$setLabel = F2(
	function (label, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				var optionValue = option.c;
				var description = option.d;
				var group = option.e;
				var search = option.f;
				return A6($author$project$Option$Option, optionDisplay, label, optionValue, description, group, search);
			case 'CustomOption':
				var optionDisplay = option.a;
				var search = option.d;
				return A4(
					$author$project$Option$CustomOption,
					optionDisplay,
					label,
					$author$project$OptionValue$OptionValue(
						$author$project$OptionLabel$optionLabelToString(label)),
					search);
			case 'EmptyOption':
				var optionDisplay = option.a;
				return A2($author$project$Option$EmptyOption, optionDisplay, label);
			default:
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$DatalistOption,
					optionDisplay,
					$author$project$OptionValue$stringToOptionValue(
						$author$project$OptionLabel$optionLabelToString(label)));
		}
	});
var $author$project$OptionDisplay$OptionSelectedAndInvalid = F2(
	function (a, b) {
		return {$: 'OptionSelectedAndInvalid', a: a, b: b};
	});
var $author$project$OptionDisplay$OptionSelectedPendingValidation = function (a) {
	return {$: 'OptionSelectedPendingValidation', a: a};
};
var $author$project$OptionDisplay$setSelectedIndex = F2(
	function (selectedIndex, optionDisplay) {
		switch (optionDisplay.$) {
			case 'OptionShown':
				return optionDisplay;
			case 'OptionHidden':
				return optionDisplay;
			case 'OptionSelected':
				var age = optionDisplay.b;
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, age);
			case 'OptionSelectedPendingValidation':
				return $author$project$OptionDisplay$OptionSelectedPendingValidation(selectedIndex);
			case 'OptionSelectedAndInvalid':
				var errors = optionDisplay.b;
				return A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, errors);
			case 'OptionSelectedHighlighted':
				return $author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex);
			case 'OptionHighlighted':
				return optionDisplay;
			case 'OptionDisabled':
				return optionDisplay;
			default:
				return optionDisplay;
		}
	});
var $author$project$Option$setOptionSelectedIndex = F2(
	function (selectedIndex, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$setOptionDisplay,
					A2($author$project$OptionDisplay$setSelectedIndex, selectedIndex, optionDisplay),
					option);
			case 'CustomOption':
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$setOptionDisplay,
					A2($author$project$OptionDisplay$setSelectedIndex, selectedIndex, optionDisplay),
					option);
			case 'EmptyOption':
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$setOptionDisplay,
					A2($author$project$OptionDisplay$setSelectedIndex, selectedIndex, optionDisplay),
					option);
			default:
				var optionDisplay = option.a;
				return A2(
					$author$project$Option$setOptionDisplay,
					A2($author$project$OptionDisplay$setSelectedIndex, selectedIndex, optionDisplay),
					option);
		}
	});
var $author$project$Option$merge2Options = F2(
	function (optionA, optionB) {
		var selectedIndex = A2($author$project$Option$orSelectedIndex, optionA, optionB);
		var optionLabel = A2($author$project$Option$orOptionLabel, optionA, optionB);
		var optionGroup = A2($author$project$Option$orOptionGroup, optionA, optionB);
		var optionDescription = A2($author$project$Option$orOptionDescriptions, optionA, optionB);
		return A2(
			$author$project$Option$setOptionSelectedIndex,
			selectedIndex,
			A2(
				$author$project$Option$setGroup,
				optionGroup,
				A2(
					$author$project$Option$setLabel,
					optionLabel,
					A2($author$project$Option$setDescription, optionDescription, optionA))));
	});
var $author$project$OptionsUtilities$addAdditionalOptionsToOptionList = F2(
	function (currentOptions, newOptions) {
		var reallyNewOptions = A2(
			$elm$core$List$filter,
			function (newOption_) {
				return !A2($author$project$OptionsUtilities$isOptionInListOfOptionsByValue, newOption_, currentOptions);
			},
			newOptions);
		var currentOptionsWithUpdates = A2(
			$elm$core$List$map,
			function (currentOption) {
				var _v0 = A2($author$project$OptionsUtilities$findOptionByOptionUsingOptionValue, currentOption, newOptions);
				if (_v0.$ === 'Just') {
					var newOption_ = _v0.a;
					return A2($author$project$Option$merge2Options, currentOption, newOption_);
				} else {
					return currentOption;
				}
			},
			currentOptions);
		return _Utils_ap(reallyNewOptions, currentOptionsWithUpdates);
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$OptionsUtilities$addNewEmptyOptionAtIndex = F2(
	function (index, options) {
		var secondPart = A2($elm$core$List$drop, index, options);
		var firstPart = A2($elm$core$List$take, index, options);
		return $author$project$OptionsUtilities$reIndexSelectedOptions(
			_Utils_ap(
				firstPart,
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$author$project$Option$DatalistOption,
							A2($author$project$OptionDisplay$OptionSelected, index, $author$project$OptionDisplay$MatureOption),
							$author$project$OptionValue$EmptyOptionValue)
						]),
					secondPart)));
	});
var $author$project$OptionDisplay$OptionHighlighted = {$: 'OptionHighlighted'};
var $author$project$OptionDisplay$addHighlight = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return $author$project$OptionDisplay$OptionHighlighted;
		case 'OptionHidden':
			return optionDisplay;
		case 'OptionSelected':
			var selectedIndex = optionDisplay.a;
			return $author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex);
		case 'OptionSelectedPendingValidation':
			return optionDisplay;
		case 'OptionSelectedAndInvalid':
			return optionDisplay;
		case 'OptionSelectedHighlighted':
			return optionDisplay;
		case 'OptionHighlighted':
			return optionDisplay;
		case 'OptionDisabled':
			return optionDisplay;
		default:
			return $author$project$OptionDisplay$OptionHighlighted;
	}
};
var $author$project$Option$highlightOption = function (option) {
	switch (option.$) {
		case 'Option':
			var display = option.a;
			return A2(
				$author$project$Option$setOptionDisplay,
				$author$project$OptionDisplay$addHighlight(display),
				option);
		case 'CustomOption':
			var display = option.a;
			return A2(
				$author$project$Option$setOptionDisplay,
				$author$project$OptionDisplay$addHighlight(display),
				option);
		case 'EmptyOption':
			var display = option.a;
			return A2(
				$author$project$Option$setOptionDisplay,
				$author$project$OptionDisplay$addHighlight(display),
				option);
		default:
			return option;
	}
};
var $author$project$OptionsUtilities$highlightOptionInList = F2(
	function (option, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				return _Utils_eq(option, option_) ? $author$project$Option$highlightOption(option_) : $author$project$Option$removeHighlightFromOption(option_);
			},
			options);
	});
var $author$project$OptionsUtilities$adjustHighlightedOptionAfterSearch = F2(
	function (allOptions, visibleOptions) {
		var _v0 = $elm$core$List$head(visibleOptions);
		if (_v0.$ === 'Just') {
			var firstOption = _v0.a;
			return A2($author$project$OptionsUtilities$highlightOptionInList, firstOption, allOptions);
		} else {
			return allOptions;
		}
	});
var $author$project$Option$isEmptyOptionOrHasEmptyValue = function (option) {
	return $author$project$Option$isEmptyOption(option) || $author$project$OptionValue$isEmpty(
		$author$project$Option$getOptionValue(option));
};
var $author$project$OptionsUtilities$cleanupEmptySelectedOptions = function (options) {
	var selectedOptions_ = $author$project$OptionsUtilities$selectedOptions(options);
	var selectedOptionsSansEmptyOptions = A2(
		$elm$core$List$filter,
		A2($elm$core$Basics$composeR, $author$project$Option$isEmptyOptionOrHasEmptyValue, $elm$core$Basics$not),
		$author$project$OptionsUtilities$selectedOptions(options));
	return (($elm$core$List$length(selectedOptions_) > 1) && ($elm$core$List$length(selectedOptionsSansEmptyOptions) > 1)) ? selectedOptionsSansEmptyOptions : (($elm$core$List$length(selectedOptions_) > 1) ? A2($elm$core$List$take, 1, selectedOptions_) : options);
};
var $author$project$MuchSelect$ReportOptionDeselected = function (a) {
	return {$: 'ReportOptionDeselected', a: a};
};
var $author$project$OptionsUtilities$deselectAllOptionsInOptionsList = function (options) {
	return A2($elm$core$List$map, $author$project$Option$deselectOption, options);
};
var $author$project$SelectionMode$isFocused = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var interactionState = selectionConfig.c;
		switch (interactionState.$) {
			case 'Focused':
				return true;
			case 'Unfocused':
				return false;
			default:
				return false;
		}
	} else {
		var interactionState = selectionConfig.c;
		switch (interactionState.$) {
			case 'Focused':
				return true;
			case 'Unfocused':
				return false;
			default:
				return false;
		}
	}
};
var $author$project$MuchSelect$CustomOptionSelected = function (a) {
	return {$: 'CustomOptionSelected', a: a};
};
var $author$project$MuchSelect$InvalidValue = function (a) {
	return {$: 'InvalidValue', a: a};
};
var $author$project$MuchSelect$SendCustomValidationRequest = function (a) {
	return {$: 'SendCustomValidationRequest', a: a};
};
var $author$project$MuchSelect$ValueCleared = {$: 'ValueCleared'};
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$OptionsUtilities$allOptionsAreValid = function (options) {
	return A2($elm$core$List$all, $author$project$Option$isValid, options);
};
var $author$project$Option$isCustomOption = function (option) {
	switch (option.$) {
		case 'Option':
			return false;
		case 'CustomOption':
			return true;
		case 'EmptyOption':
			return false;
		default:
			return false;
	}
};
var $author$project$OptionsUtilities$customOptions = function (options) {
	return A2($elm$core$List$filter, $author$project$Option$isCustomOption, options);
};
var $author$project$OptionsUtilities$customSelectedOptions = A2($elm$core$Basics$composeR, $author$project$OptionsUtilities$customOptions, $author$project$OptionsUtilities$selectedOptions);
var $author$project$OptionsUtilities$hasAnyPendingValidation = function (options) {
	return A2($elm$core$List$any, $author$project$Option$isPendingValidation, options);
};
var $author$project$OptionsUtilities$optionsValues = function (options) {
	return A2($elm$core$List$map, $author$project$Option$getOptionValueAsString, options);
};
var $author$project$MuchSelect$makeEffectsWhenValuesChanges = F4(
	function (eventsMode, selectionMode, selectedValueEncoding, selectedOptions) {
		var valueChangeCmd = $author$project$OptionsUtilities$allOptionsAreValid(selectedOptions) ? A2(
			$author$project$MuchSelect$ReportValueChanged,
			$author$project$Ports$optionsEncoder(selectedOptions),
			selectionMode) : ($author$project$OptionsUtilities$hasAnyPendingValidation(selectedOptions) ? $author$project$MuchSelect$NoEffect : $author$project$MuchSelect$InvalidValue(
			$author$project$Ports$optionsEncoder(selectedOptions)));
		var selectedCustomOptions = $author$project$OptionsUtilities$customSelectedOptions(selectedOptions);
		var lightDomChangeEffect = function () {
			if (eventsMode.$ === 'EventsOnly') {
				return $author$project$MuchSelect$NoEffect;
			} else {
				return $author$project$MuchSelect$ChangeTheLightDom(
					$author$project$LightDomChange$UpdateSelectedValue(
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'rawValue',
									A3($author$project$SelectedValueEncoding$rawSelectedValue, selectionMode, selectedValueEncoding, selectedOptions)),
									_Utils_Tuple2(
									'value',
									A2($author$project$SelectedValueEncoding$selectedValue, selectionMode, selectedOptions)),
									_Utils_Tuple2(
									'selectionMode',
									function () {
										if (selectionMode.$ === 'SingleSelect') {
											return $elm$json$Json$Encode$string('single-select');
										} else {
											return $elm$json$Json$Encode$string('multi-select');
										}
									}())
								]))));
			}
		}();
		var customValidationCmd = $author$project$OptionsUtilities$hasAnyPendingValidation(selectedOptions) ? $author$project$MuchSelect$batch(
			A2(
				$elm$core$List$map,
				function (option) {
					return $author$project$MuchSelect$SendCustomValidationRequest(
						_Utils_Tuple2(
							$author$project$Option$getOptionValueAsString(option),
							$author$project$Option$getOptionSelectedIndex(option)));
				},
				A2($elm$core$List$filter, $author$project$Option$isPendingValidation, selectedOptions))) : $author$project$MuchSelect$NoEffect;
		var customOptionCmd = $elm$core$List$isEmpty(selectedCustomOptions) ? $author$project$MuchSelect$NoEffect : ($author$project$OptionsUtilities$allOptionsAreValid(selectedCustomOptions) ? $author$project$MuchSelect$CustomOptionSelected(
			$author$project$OptionsUtilities$optionsValues(selectedCustomOptions)) : $author$project$MuchSelect$NoEffect);
		var clearCmd = $elm$core$List$isEmpty(selectedOptions) ? $author$project$MuchSelect$ValueCleared : $author$project$MuchSelect$NoEffect;
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[valueChangeCmd, customOptionCmd, clearCmd, customValidationCmd, lightDomChangeEffect]));
	});
var $author$project$RightSlot$updateRightSlot = F4(
	function (current, outputStyle, selectionMode, selectedOptions) {
		var hasSelectedOption = !$elm$core$List$isEmpty(selectedOptions);
		if (outputStyle.$ === 'CustomHtml') {
			if (selectionMode.$ === 'SingleSelect') {
				switch (current.$) {
					case 'ShowNothing':
						return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
					case 'ShowLoadingIndicator':
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 'ShowDropdownIndicator':
						var transitioning = current.a;
						return $author$project$RightSlot$ShowDropdownIndicator(transitioning);
					case 'ShowClearButton':
						return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
					case 'ShowAddButton':
						return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
					default:
						return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
				}
			} else {
				switch (current.$) {
					case 'ShowNothing':
						return hasSelectedOption ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
					case 'ShowLoadingIndicator':
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 'ShowDropdownIndicator':
						var focusTransition = current.a;
						return hasSelectedOption ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
					case 'ShowClearButton':
						return hasSelectedOption ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
					case 'ShowAddButton':
						return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
					default:
						return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
				}
			}
		} else {
			if (selectionMode.$ === 'SingleSelect') {
				switch (current.$) {
					case 'ShowNothing':
						return $author$project$RightSlot$ShowNothing;
					case 'ShowLoadingIndicator':
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 'ShowDropdownIndicator':
						return $author$project$RightSlot$ShowNothing;
					case 'ShowClearButton':
						return $author$project$RightSlot$ShowNothing;
					case 'ShowAddButton':
						return $author$project$RightSlot$ShowNothing;
					default:
						return $author$project$RightSlot$ShowNothing;
				}
			} else {
				var showRemoveButtons = $elm$core$List$length(selectedOptions) > 1;
				var showAddButtons = A2(
					$elm$core$List$any,
					function (option) {
						return !$author$project$OptionValue$isEmpty(
							$author$project$Option$getOptionValue(option));
					},
					selectedOptions);
				var addAndRemoveButtonState = (showAddButtons && (!showRemoveButtons)) ? $author$project$RightSlot$ShowAddButton : ((showAddButtons && showRemoveButtons) ? $author$project$RightSlot$ShowAddAndRemoveButtons : $author$project$RightSlot$ShowNothing);
				switch (current.$) {
					case 'ShowNothing':
						return addAndRemoveButtonState;
					case 'ShowLoadingIndicator':
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 'ShowDropdownIndicator':
						return addAndRemoveButtonState;
					case 'ShowClearButton':
						return addAndRemoveButtonState;
					case 'ShowAddButton':
						return addAndRemoveButtonState;
					default:
						return addAndRemoveButtonState;
				}
			}
		}
	});
var $author$project$MuchSelect$clearAllSelectedOption = function (model) {
	var optionsAboutToBeDeselected = $author$project$OptionsUtilities$selectedOptions(model.options);
	var newOptions = $author$project$OptionsUtilities$deselectAllOptionsInOptionsList(model.options);
	var focusEffect = $author$project$SelectionMode$isFocused(model.selectionConfig) ? $author$project$MuchSelect$FocusInput : $author$project$MuchSelect$NoEffect;
	var deselectEventEffect = $elm$core$List$isEmpty(optionsAboutToBeDeselected) ? $author$project$MuchSelect$NoEffect : $author$project$MuchSelect$ReportOptionDeselected(
		$author$project$Ports$optionsEncoder(
			$author$project$OptionsUtilities$deselectAllOptionsInOptionsList(optionsAboutToBeDeselected)));
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				options: $author$project$OptionsUtilities$deselectAllOptionsInOptionsList(newOptions),
				rightSlot: A4(
					$author$project$RightSlot$updateRightSlot,
					model.rightSlot,
					$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
					$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
					_List_Nil),
				searchString: $author$project$SearchString$reset
			}),
		$author$project$MuchSelect$batch(
			_List_fromArray(
				[
					A4(
					$author$project$MuchSelect$makeEffectsWhenValuesChanges,
					$author$project$SelectionMode$getEventMode(model.selectionConfig),
					$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
					model.selectedValueEncoding,
					_List_Nil),
					deselectEventEffect,
					focusEffect
				])));
};
var $author$project$TransformAndValidate$CustomValidationFailed = F3(
	function (a, b, c) {
		return {$: 'CustomValidationFailed', a: a, b: b, c: c};
	});
var $author$project$TransformAndValidate$ValidationFailureMessage = F2(
	function (a, b) {
		return {$: 'ValidationFailureMessage', a: a, b: b};
	});
var $author$project$TransformAndValidate$validationFailedMessageDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$TransformAndValidate$ValidationFailureMessage,
	A2($elm$json$Json$Decode$field, 'level', $author$project$TransformAndValidate$validationReportLevelDecoder),
	A2($elm$json$Json$Decode$field, 'errorMessage', $author$project$TransformAndValidate$validationErrorMessageDecoder));
var $author$project$TransformAndValidate$customValidationFailedResultDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'isValid', $elm$json$Json$Decode$bool),
	$author$project$TransformAndValidate$is(false),
	A4(
		$elm$json$Json$Decode$map3,
		$author$project$TransformAndValidate$CustomValidationFailed,
		A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'selectedValueIndex', $elm$json$Json$Decode$int),
		A2(
			$elm$json$Json$Decode$field,
			'errorMessages',
			$elm$json$Json$Decode$list($author$project$TransformAndValidate$validationFailedMessageDecoder))));
var $author$project$TransformAndValidate$CustomValidationPass = F2(
	function (a, b) {
		return {$: 'CustomValidationPass', a: a, b: b};
	});
var $author$project$TransformAndValidate$customValidationPassedResultDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'isValid', $elm$json$Json$Decode$bool),
	$author$project$TransformAndValidate$is(true),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$TransformAndValidate$CustomValidationPass,
		A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'selectedValueIndex', $elm$json$Json$Decode$int)));
var $author$project$TransformAndValidate$customValidationResultDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$TransformAndValidate$customValidationPassedResultDecoder, $author$project$TransformAndValidate$customValidationFailedResultDecoder]));
var $author$project$Option$SearchResults = F3(
	function (optionSearchFilters, searchNonce, isClearingSearch) {
		return {isClearingSearch: isClearingSearch, optionSearchFilters: optionSearchFilters, searchNonce: searchNonce};
	});
var $author$project$OptionSearchFilter$OptionSearchFilter = F5(
	function (totalScore, bestScore, labelTokens, descriptionTokens, groupTokens) {
		return {bestScore: bestScore, descriptionTokens: descriptionTokens, groupTokens: groupTokens, labelTokens: labelTokens, totalScore: totalScore};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$OptionSearchFilter$decodeToken = A3(
	$elm$json$Json$Decode$map2,
	$elm$core$Tuple$pair,
	A2($elm$json$Json$Decode$field, 'isHighlighted', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'stringChunk', $elm$json$Json$Decode$string));
var $author$project$OptionSearchFilter$decodeTokens = $elm$json$Json$Decode$list($author$project$OptionSearchFilter$decodeToken);
var $author$project$OptionSearchFilter$decode = A6(
	$elm$json$Json$Decode$map5,
	$author$project$OptionSearchFilter$OptionSearchFilter,
	A2($elm$json$Json$Decode$field, 'totalScore', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'bestScore', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'labelTokens', $author$project$OptionSearchFilter$decodeTokens),
	A2($elm$json$Json$Decode$field, 'descriptionTokens', $author$project$OptionSearchFilter$decodeTokens),
	A2($elm$json$Json$Decode$field, 'groupTokens', $author$project$OptionSearchFilter$decodeTokens));
var $author$project$Option$decodeSearchResults = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Option$SearchResults,
	A2(
		$elm$json$Json$Decode$field,
		'options',
		$elm$json$Json$Decode$list(
			A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (value, searchFilter) {
						return {maybeSearchFilter: searchFilter, value: value};
					}),
				A2($elm$json$Json$Decode$field, 'value', $author$project$Option$valueDecoder),
				A2(
					$elm$json$Json$Decode$field,
					'searchFilter',
					$elm$json$Json$Decode$nullable($author$project$OptionSearchFilter$decode))))),
	A2($elm$json$Json$Decode$field, 'searchNonce', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'clearingSearch', $elm$json$Json$Decode$bool));
var $author$project$OptionsUtilities$selectSingleOptionInList = F2(
	function (value, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				if (A2($author$project$Option$optionValuesEqual, option_, value)) {
					switch (option_.$) {
						case 'Option':
							return A2($author$project$Option$selectOption, 0, option_);
						case 'CustomOption':
							var optionValue = option_.c;
							if (optionValue.$ === 'OptionValue') {
								var valueStr = optionValue.a;
								return A3(
									$author$project$Option$setLabelWithString,
									valueStr,
									$elm$core$Maybe$Nothing,
									A2($author$project$Option$selectOption, 0, option_));
							} else {
								return A2($author$project$Option$selectOption, 0, option_);
							}
						case 'EmptyOption':
							return A2($author$project$Option$selectOption, 0, option_);
						default:
							return A2($author$project$Option$selectOption, 0, option_);
					}
				} else {
					return $author$project$Option$deselectOption(option_);
				}
			},
			options);
	});
var $author$project$OptionsUtilities$deselectAllButTheFirstSelectedOptionInList = function (options) {
	var _v0 = $elm$core$List$head(
		$author$project$OptionsUtilities$selectedOptions(options));
	if (_v0.$ === 'Just') {
		var oneOptionToLeaveSelected = _v0.a;
		return A2(
			$author$project$OptionsUtilities$selectSingleOptionInList,
			$author$project$Option$getOptionValue(oneOptionToLeaveSelected),
			options);
	} else {
		return options;
	}
};
var $author$project$OptionsUtilities$deselectAllSelectedHighlightedOptions = function (options) {
	return A2(
		$elm$core$List$map,
		function (option_) {
			switch (option_.$) {
				case 'Option':
					var optionDisplay = option_.a;
					switch (optionDisplay.$) {
						case 'OptionShown':
							return option_;
						case 'OptionHidden':
							return option_;
						case 'OptionSelected':
							return option_;
						case 'OptionSelectedPendingValidation':
							return option_;
						case 'OptionSelectedAndInvalid':
							return option_;
						case 'OptionSelectedHighlighted':
							return A2(
								$author$project$Option$setOptionDisplay,
								$author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption),
								option_);
						case 'OptionHighlighted':
							return option_;
						case 'OptionDisabled':
							return option_;
						default:
							return option_;
					}
				case 'CustomOption':
					var optionDisplay = option_.a;
					switch (optionDisplay.$) {
						case 'OptionShown':
							return option_;
						case 'OptionHidden':
							return option_;
						case 'OptionSelected':
							return option_;
						case 'OptionSelectedPendingValidation':
							return option_;
						case 'OptionSelectedAndInvalid':
							return option_;
						case 'OptionSelectedHighlighted':
							return A2(
								$author$project$Option$setOptionDisplay,
								$author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption),
								option_);
						case 'OptionHighlighted':
							return option_;
						case 'OptionDisabled':
							return option_;
						default:
							return option_;
					}
				case 'EmptyOption':
					return option_;
				default:
					return option_;
			}
		},
		options);
};
var $author$project$OptionsUtilities$deselectOptionInListByOptionValue = F2(
	function (value, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				return A2($author$project$Option$optionValuesEqual, option_, value) ? $author$project$Option$deselectOption(option_) : option_;
			},
			options);
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$OptionsUtilities$deselectLastSelectedOption = function (options) {
	var maybeLastSelectedOptionValue = A2(
		$elm$core$Maybe$map,
		$author$project$Option$getOptionValue,
		$elm_community$list_extra$List$Extra$last(
			$author$project$OptionsUtilities$selectedOptions(options)));
	if (maybeLastSelectedOptionValue.$ === 'Just') {
		var optionValueToDeselect = maybeLastSelectedOptionValue.a;
		return A2($author$project$OptionsUtilities$deselectOptionInListByOptionValue, optionValueToDeselect, options);
	} else {
		return options;
	}
};
var $author$project$SearchString$isEmpty = function (_v0) {
	var str = _v0.a;
	return !$elm$core$String$length(str);
};
var $author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker = F2(
	function (searchStringDebounceLength, searchString) {
		var searchStringUpdateCmd = $author$project$SearchString$isEmpty(searchString) ? $author$project$MuchSelect$NoEffect : $author$project$MuchSelect$SearchStringTouched(searchStringDebounceLength);
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[$author$project$MuchSelect$UpdateOptionsInWebWorker, searchStringUpdateCmd]));
	});
var $author$project$MuchSelect$makeEffectsWhenDeselectingAnOption = F5(
	function (deselectedOption, eventsMode, selectionMode, selectedValueEncoding, options) {
		var optionDeselectedEffects = $author$project$MuchSelect$ReportOptionDeselected(
			$author$project$Ports$optionEncoder(deselectedOption));
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[
					A4($author$project$MuchSelect$makeEffectsWhenValuesChanges, eventsMode, selectionMode, selectedValueEncoding, options),
					optionDeselectedEffects
				]));
	});
var $author$project$SelectionMode$getCustomOptionHint = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			var _v2 = singleSelectCustomHtmlFields.customOptions;
			if (_v2.$ === 'AllowCustomOptions') {
				var customOptionHint = _v2.a;
				return customOptionHint;
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			var _v4 = multiSelectCustomHtmlFields.customOptions;
			if (_v4.$ === 'AllowCustomOptions') {
				var customOptionHint = _v4.a;
				return customOptionHint;
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$SelectionMode$getCustomOptions = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.customOptions;
		} else {
			var transformAndValidate = singleSelectOutputStyle.b;
			return A2($author$project$OutputStyle$AllowCustomOptions, $elm$core$Maybe$Nothing, transformAndValidate);
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.customOptions;
		} else {
			var transformAndValidate = multiSelectOutputStyle.b;
			return A2($author$project$OutputStyle$AllowCustomOptions, $elm$core$Maybe$Nothing, transformAndValidate);
		}
	}
};
var $author$project$SearchString$length = function (_v0) {
	var str = _v0.a;
	return $elm$core$String$length(str);
};
var $author$project$SearchString$new = F2(
	function (string, isCleared_) {
		return A2($author$project$SearchString$SearchString, string, isCleared_);
	});
var $author$project$OptionLabel$optionLabelToSearchString = function (optionLabel) {
	var string = optionLabel.a;
	var maybeCleanString = optionLabel.b;
	if (maybeCleanString.$ === 'Just') {
		var cleanString = maybeCleanString.a;
		return cleanString;
	} else {
		return $elm$core$String$toLower(string);
	}
};
var $author$project$SearchString$toString = function (_v0) {
	var str = _v0.a;
	return str;
};
var $author$project$OptionsUtilities$prependCustomOption = F3(
	function (maybeCustomOptionHint, searchString, options) {
		var label = function () {
			if (maybeCustomOptionHint.$ === 'Just') {
				var customOptionHint = maybeCustomOptionHint.a;
				var parts = A2($elm$core$String$split, '{{}}', customOptionHint);
				if (!parts.b) {
					return 'Add ' + ($author$project$SearchString$toString(searchString) + '…');
				} else {
					if (!parts.b.b) {
						return _Utils_ap(
							customOptionHint,
							$author$project$SearchString$toString(searchString));
					} else {
						var first = parts.a;
						var _v2 = parts.b;
						var second = _v2.a;
						return _Utils_ap(
							first,
							_Utils_ap(
								$author$project$SearchString$toString(searchString),
								second));
					}
				}
			} else {
				return 'Add ' + ($author$project$SearchString$toString(searchString) + '…');
			}
		}();
		return _Utils_ap(
			_List_fromArray(
				[
					A4(
					$author$project$Option$CustomOption,
					$author$project$OptionDisplay$OptionShown($author$project$OptionDisplay$MatureOption),
					A2($author$project$OptionLabel$newWithCleanLabel, label, $elm$core$Maybe$Nothing),
					$author$project$OptionValue$OptionValue(
						$author$project$SearchString$toString(searchString)),
					$elm$core$Maybe$Nothing)
				]),
			options);
	});
var $author$project$OptionsUtilities$optionListContainsOptionWithValue = F2(
	function (needle, haystack) {
		var optionValue = $author$project$Option$getOptionValue(needle);
		return !$elm$core$List$isEmpty(
			A2(
				$elm$core$List$filter,
				function (option_) {
					return _Utils_eq(
						$author$project$Option$getOptionValue(option_),
						optionValue);
				},
				haystack));
	});
var $author$project$OptionsUtilities$removeOptionsFromOptionList = F2(
	function (options, optionsToRemove) {
		return A2(
			$elm$core$List$filter,
			function (option) {
				return !A2($author$project$OptionsUtilities$optionListContainsOptionWithValue, option, optionsToRemove);
			},
			options);
	});
var $author$project$OptionsUtilities$removeUnselectedCustomOptions = function (options) {
	var unselectedCustomOptions = $author$project$OptionsUtilities$unselectedOptions(
		$author$project$OptionsUtilities$customOptions(options));
	return A2($author$project$OptionsUtilities$removeOptionsFromOptionList, options, unselectedCustomOptions);
};
var $author$project$SearchString$toLower = function (_v0) {
	var str = _v0.a;
	return $elm$core$String$toLower(str);
};
var $author$project$TransformAndValidate$ValidationFailed = F3(
	function (a, b, c) {
		return {$: 'ValidationFailed', a: a, b: b, c: c};
	});
var $author$project$TransformAndValidate$ValidationPass = F2(
	function (a, b) {
		return {$: 'ValidationPass', a: a, b: b};
	});
var $author$project$TransformAndValidate$ValidationPending = F2(
	function (a, b) {
		return {$: 'ValidationPending', a: a, b: b};
	});
var $author$project$TransformAndValidate$getSelectedIndexFromValidationResult = function (validationResult) {
	switch (validationResult.$) {
		case 'ValidationPass':
			var selectedIndex = validationResult.b;
			return selectedIndex;
		case 'ValidationFailed':
			var selectedIndex = validationResult.b;
			return selectedIndex;
		default:
			var selectedIndex = validationResult.b;
			return selectedIndex;
	}
};
var $author$project$TransformAndValidate$getSelectedIndexFromValidationResults = function (validationResults) {
	var _v0 = $elm$core$List$head(validationResults);
	if (_v0.$ === 'Just') {
		var firstResult = _v0.a;
		return $author$project$TransformAndValidate$getSelectedIndexFromValidationResult(firstResult);
	} else {
		return 0;
	}
};
var $author$project$TransformAndValidate$getValidationFailures = function (validationResult) {
	switch (validationResult.$) {
		case 'ValidationPass':
			return _List_Nil;
		case 'ValidationFailed':
			var validationFailures = validationResult.c;
			return validationFailures;
		default:
			return _List_Nil;
	}
};
var $author$project$TransformAndValidate$hasValidationFailed = function (validationResult) {
	switch (validationResult.$) {
		case 'ValidationPass':
			return false;
		case 'ValidationFailed':
			return true;
		default:
			return false;
	}
};
var $author$project$TransformAndValidate$hasValidationPending = function (validationResult) {
	switch (validationResult.$) {
		case 'ValidationPass':
			return false;
		case 'ValidationFailed':
			return false;
		default:
			return true;
	}
};
var $author$project$TransformAndValidate$rollUpErrors = F2(
	function (transformedString, results) {
		return A2($elm$core$List$any, $author$project$TransformAndValidate$hasValidationFailed, results) ? A3(
			$author$project$TransformAndValidate$ValidationFailed,
			transformedString,
			$author$project$TransformAndValidate$getSelectedIndexFromValidationResults(results),
			A2($elm$core$List$concatMap, $author$project$TransformAndValidate$getValidationFailures, results)) : (A2($elm$core$List$any, $author$project$TransformAndValidate$hasValidationPending, results) ? A2(
			$author$project$TransformAndValidate$ValidationPending,
			transformedString,
			$author$project$TransformAndValidate$getSelectedIndexFromValidationResults(results)) : A2(
			$author$project$TransformAndValidate$ValidationPass,
			transformedString,
			$author$project$TransformAndValidate$getSelectedIndexFromValidationResults(results)));
	});
var $author$project$TransformAndValidate$transform = F2(
	function (transformer, string) {
		return $elm$core$String$toLower(string);
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$TransformAndValidate$validate = F3(
	function (validator, string, selectedValueIndex) {
		switch (validator.$) {
			case 'NoWhiteSpace':
				var level = validator.a;
				var validationErrorMessage = validator.b;
				var stringWithNoWhiteSpace = A3($elm$core$String$replace, ' ', '', string);
				return _Utils_eq(
					$elm$core$String$length(stringWithNoWhiteSpace),
					$elm$core$String$length(string)) ? A2($author$project$TransformAndValidate$ValidationPass, string, selectedValueIndex) : A3(
					$author$project$TransformAndValidate$ValidationFailed,
					string,
					selectedValueIndex,
					_List_fromArray(
						[
							A2($author$project$TransformAndValidate$ValidationFailureMessage, level, validationErrorMessage)
						]));
			case 'MinimumLength':
				var level = validator.a;
				var validationErrorMessage = validator.b;
				var _int = validator.c;
				return (_Utils_cmp(
					$elm$core$String$length(string),
					_int) > -1) ? A2($author$project$TransformAndValidate$ValidationPass, string, selectedValueIndex) : A3(
					$author$project$TransformAndValidate$ValidationFailed,
					string,
					selectedValueIndex,
					_List_fromArray(
						[
							A2($author$project$TransformAndValidate$ValidationFailureMessage, level, validationErrorMessage)
						]));
			default:
				return A2($author$project$TransformAndValidate$ValidationPending, string, selectedValueIndex);
		}
	});
var $author$project$TransformAndValidate$transformAndValidateSearchString = F2(
	function (_v0, searchString) {
		var transformers = _v0.a;
		var validators = _v0.b;
		var transformedString = A3(
			$elm_community$list_extra$List$Extra$mapAccuml,
			F2(
				function (str, t) {
					return _Utils_Tuple2(
						A2($author$project$TransformAndValidate$transform, t, str),
						t);
				}),
			$author$project$SearchString$toString(searchString),
			transformers).a;
		return A2(
			$author$project$TransformAndValidate$rollUpErrors,
			transformedString,
			A2(
				$elm$core$List$map,
				function (validator) {
					return A3($author$project$TransformAndValidate$validate, validator, transformedString, 0);
				},
				validators));
	});
var $author$project$OptionSearcher$updateOrAddCustomOption = F3(
	function (searchString, selectionMode, options) {
		var noExactOptionLabelMatch = !A2(
			$elm$core$List$any,
			function (option_) {
				return _Utils_eq(
					$author$project$OptionLabel$optionLabelToSearchString(
						$author$project$Option$getOptionLabel(option_)),
					$author$project$SearchString$toLower(searchString)) && (!$author$project$Option$isCustomOption(option_));
			},
			options);
		var _v0 = function () {
			if ($author$project$SearchString$length(searchString) > 0) {
				var _v1 = $author$project$SelectionMode$getCustomOptions(selectionMode);
				if (_v1.$ === 'AllowCustomOptions') {
					var transformAndValidate = _v1.b;
					var _v2 = A2($author$project$TransformAndValidate$transformAndValidateSearchString, transformAndValidate, searchString);
					switch (_v2.$) {
						case 'ValidationPass':
							var str = _v2.a;
							return _Utils_Tuple2(
								true,
								A2($author$project$SearchString$new, str, false));
						case 'ValidationFailed':
							return _Utils_Tuple2(false, searchString);
						default:
							return _Utils_Tuple2(false, searchString);
					}
				} else {
					return _Utils_Tuple2(false, searchString);
				}
			} else {
				return _Utils_Tuple2(false, searchString);
			}
		}();
		var showCustomOption = _v0.a;
		var newSearchString = _v0.b;
		return (showCustomOption && noExactOptionLabelMatch) ? A3(
			$author$project$OptionsUtilities$prependCustomOption,
			$author$project$SelectionMode$getCustomOptionHint(selectionMode),
			newSearchString,
			$author$project$OptionsUtilities$removeUnselectedCustomOptions(options)) : $author$project$OptionsUtilities$removeUnselectedCustomOptions(options);
	});
var $author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWithSearchString = F5(
	function (rightSlot, selectionConfig, searchString, options, model) {
		return _Utils_update(
			model,
			{
				options: A3($author$project$OptionSearcher$updateOrAddCustomOption, searchString, selectionConfig, options),
				rightSlot: A4(
					$author$project$RightSlot$updateRightSlot,
					rightSlot,
					$author$project$SelectionMode$getOutputStyle(selectionConfig),
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					$author$project$OptionsUtilities$selectedOptions(options))
			});
	});
var $author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges = function (model) {
	return A5($author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWithSearchString, model.rightSlot, model.selectionConfig, model.searchString, model.options, model);
};
var $author$project$MuchSelect$deselectOption = F2(
	function (model, option) {
		var optionValue = $author$project$Option$getOptionValue(option);
		var updatedOptions = A2($author$project$OptionsUtilities$deselectOptionInListByOptionValue, optionValue, model.options);
		return _Utils_Tuple2(
			$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
				_Utils_update(
					model,
					{options: updatedOptions})),
			$author$project$MuchSelect$batch(
				_List_fromArray(
					[
						A5(
						$author$project$MuchSelect$makeEffectsWhenDeselectingAnOption,
						option,
						$author$project$SelectionMode$getEventMode(model.selectionConfig),
						$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
						model.selectedValueEncoding,
						$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
						A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString)
					])));
	});
var $author$project$Option$optionDescriptionToSearchString = function (optionDescription) {
	if (optionDescription.$ === 'OptionDescription') {
		var description = optionDescription.a;
		var maybeCleanDescription = optionDescription.b;
		if (maybeCleanDescription.$ === 'Just') {
			var cleanDescription = maybeCleanDescription.a;
			return cleanDescription;
		} else {
			return $elm$core$String$toLower(description);
		}
	} else {
		return '';
	}
};
var $author$project$Option$optionDescriptionToString = function (optionDescription) {
	if (optionDescription.$ === 'OptionDescription') {
		var string = optionDescription.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$Option$optionGroupToString = function (optionGroup) {
	if (optionGroup.$ === 'OptionGroup') {
		var string = optionGroup.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$Option$encode = function (option) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(
					$author$project$Option$getOptionValueAsString(option))),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToString(
						$author$project$Option$getOptionLabel(option)))),
				_Utils_Tuple2(
				'labelClean',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToSearchString(
						$author$project$Option$getOptionLabel(option)))),
				_Utils_Tuple2(
				'group',
				$elm$json$Json$Encode$string(
					$author$project$Option$optionGroupToString(
						$author$project$Option$getOptionGroup(option)))),
				_Utils_Tuple2(
				'description',
				$elm$json$Json$Encode$string(
					$author$project$Option$optionDescriptionToString(
						$author$project$Option$getOptionDescription(option)))),
				_Utils_Tuple2(
				'descriptionClean',
				$elm$json$Json$Encode$string(
					$author$project$Option$optionDescriptionToSearchString(
						$author$project$Option$getOptionDescription(option)))),
				_Utils_Tuple2(
				'isSelected',
				$elm$json$Json$Encode$bool(
					$author$project$Option$isOptionSelected(option)))
			]));
};
var $author$project$SelectionMode$getMaxDropdownItems = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.maxDropdownItems;
		} else {
			return $author$project$OutputStyle$NoLimitToDropdownItems;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.maxDropdownItems;
		} else {
			return $author$project$OutputStyle$NoLimitToDropdownItems;
		}
	}
};
var $author$project$SelectionMode$getPlaceholder = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var placeholder = selectionConfig.b;
		return placeholder;
	} else {
		var placeholder = selectionConfig.b;
		return placeholder;
	}
};
var $author$project$SelectionMode$getSearchStringMinimumLength = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.searchStringMinimumLength;
		} else {
			return $author$project$OutputStyle$NoMinimumToSearchStringLength;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.searchStringMinimumLength;
		} else {
			return $author$project$OutputStyle$NoMinimumToSearchStringLength;
		}
	}
};
var $author$project$OutputStyle$SelectedItemIsHidden = {$: 'SelectedItemIsHidden'};
var $author$project$SelectionMode$getSelectedItemPlacementMode = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.selectedItemPlacementMode;
		} else {
			return $author$project$OutputStyle$SelectedItemIsHidden;
		}
	} else {
		return $author$project$OutputStyle$SelectedItemStaysInPlace;
	}
};
var $author$project$SelectionMode$getSingleItemRemoval = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		return $author$project$OutputStyle$DisableSingleItemRemoval;
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.singleItemRemoval;
		} else {
			return $author$project$OutputStyle$EnableSingleItemRemoval;
		}
	}
};
var $author$project$SelectionMode$isDisabled = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var interactionState = selectionConfig.c;
		switch (interactionState.$) {
			case 'Focused':
				return false;
			case 'Unfocused':
				return false;
			default:
				return true;
		}
	} else {
		var interactionState = selectionConfig.c;
		switch (interactionState.$) {
			case 'Focused':
				return false;
			case 'Unfocused':
				return false;
			default:
				return true;
		}
	}
};
var $author$project$SelectionMode$isEventsOnly = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			var _v2 = singleSelectCustomHtmlFields.eventsMode;
			if (_v2.$ === 'EventsOnly') {
				return true;
			} else {
				return false;
			}
		} else {
			var eventsMode = singleSelectOutputStyle.a;
			if (eventsMode.$ === 'EventsOnly') {
				return true;
			} else {
				return false;
			}
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			var _v5 = multiSelectCustomHtmlFields.eventsMode;
			if (_v5.$ === 'EventsOnly') {
				return true;
			} else {
				return false;
			}
		} else {
			var eventsMode = multiSelectOutputStyle.a;
			if (eventsMode.$ === 'EventsOnly') {
				return true;
			} else {
				return false;
			}
		}
	}
};
var $author$project$RightSlot$isLoading = function (rightSlot) {
	switch (rightSlot.$) {
		case 'ShowNothing':
			return false;
		case 'ShowLoadingIndicator':
			return true;
		case 'ShowDropdownIndicator':
			return false;
		case 'ShowClearButton':
			return false;
		case 'ShowAddButton':
			return false;
		default:
			return false;
	}
};
var $author$project$SelectionMode$outputStyleToString = function (outputStyle) {
	if (outputStyle.$ === 'CustomHtml') {
		return 'custom-html';
	} else {
		return 'datalist';
	}
};
var $author$project$SelectionMode$getDropdownStyle = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.dropdownStyle;
		} else {
			return $author$project$OutputStyle$NoFooter;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.dropdownStyle;
		} else {
			return $author$project$OutputStyle$NoFooter;
		}
	}
};
var $author$project$SelectionMode$showDropdownFooter = function (selectionConfig) {
	var _v0 = $author$project$SelectionMode$getDropdownStyle(selectionConfig);
	if (_v0.$ === 'NoFooter') {
		return false;
	} else {
		return true;
	}
};
var $author$project$OptionSorting$toString = function (optionSort) {
	if (optionSort.$ === 'NoSorting') {
		return 'no-sorting';
	} else {
		return 'by-option-label';
	}
};
var $author$project$SelectedValueEncoding$toString = function (selectedValueEncoding) {
	if (selectedValueEncoding.$ === 'CommaSeperated') {
		return 'comma';
	} else {
		return 'json';
	}
};
var $author$project$ConfigDump$encodeConfig = F4(
	function (selectionConfig, optionSort, selectedValueEncoding, rightSlot) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'allow-custom-options',
					$elm$json$Json$Encode$bool(
						function () {
							var _v0 = $author$project$SelectionMode$getCustomOptions(selectionConfig);
							if (_v0.$ === 'AllowCustomOptions') {
								return true;
							} else {
								return false;
							}
						}())),
					_Utils_Tuple2(
					'custom-options-hint',
					function () {
						var _v1 = $author$project$SelectionMode$getCustomOptions(selectionConfig);
						if (_v1.$ === 'AllowCustomOptions') {
							var maybeHint = _v1.a;
							if (maybeHint.$ === 'Just') {
								var hint = maybeHint.a;
								return $elm$json$Json$Encode$string(hint);
							} else {
								return $elm$json$Json$Encode$null;
							}
						} else {
							return $elm$json$Json$Encode$null;
						}
					}()),
					_Utils_Tuple2(
					'disabled',
					$elm$json$Json$Encode$bool(
						$author$project$SelectionMode$isDisabled(selectionConfig))),
					_Utils_Tuple2(
					'events-only',
					$elm$json$Json$Encode$bool(
						$author$project$SelectionMode$isEventsOnly(selectionConfig))),
					_Utils_Tuple2(
					'loading',
					$elm$json$Json$Encode$bool(
						$author$project$RightSlot$isLoading(rightSlot))),
					_Utils_Tuple2(
					'max-dropdown-items',
					$elm$json$Json$Encode$int(
						function () {
							var _v3 = $author$project$SelectionMode$getMaxDropdownItems(selectionConfig);
							if (_v3.$ === 'FixedMaxDropdownItems') {
								var i = _v3.a;
								return $author$project$PositiveInt$toInt(i);
							} else {
								return 0;
							}
						}())),
					_Utils_Tuple2(
					'multi-select',
					$elm$json$Json$Encode$bool(
						function () {
							var _v4 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
							if (_v4.$ === 'MultiSelect') {
								return true;
							} else {
								return false;
							}
						}())),
					_Utils_Tuple2(
					'option-sorting',
					$elm$json$Json$Encode$string(
						$author$project$OptionSorting$toString(optionSort))),
					_Utils_Tuple2(
					'output-style',
					$elm$json$Json$Encode$string(
						$author$project$SelectionMode$outputStyleToString(
							$author$project$SelectionMode$getOutputStyle(selectionConfig)))),
					_Utils_Tuple2(
					'placeholder',
					$elm$json$Json$Encode$string(
						$author$project$SelectionMode$getPlaceholder(selectionConfig).b)),
					_Utils_Tuple2(
					'search-string-minimum-length',
					$elm$json$Json$Encode$int(
						function () {
							var _v5 = $author$project$SelectionMode$getSearchStringMinimumLength(selectionConfig);
							if (_v5.$ === 'NoMinimumToSearchStringLength') {
								return 0;
							} else {
								var positiveInt = _v5.a;
								return $author$project$PositiveInt$toInt(positiveInt);
							}
						}())),
					_Utils_Tuple2(
					'selected-item-stays-in-place',
					$elm$json$Json$Encode$bool(
						function () {
							var _v6 = $author$project$SelectionMode$getSelectedItemPlacementMode(selectionConfig);
							switch (_v6.$) {
								case 'SelectedItemStaysInPlace':
									return true;
								case 'SelectedItemMovesToTheTop':
									return false;
								default:
									return false;
							}
						}())),
					_Utils_Tuple2(
					'selected-value-encoding',
					$elm$json$Json$Encode$string(
						$author$project$SelectedValueEncoding$toString(selectedValueEncoding))),
					_Utils_Tuple2(
					'show-dropdown-footer',
					$elm$json$Json$Encode$bool(
						$author$project$SelectionMode$showDropdownFooter(selectionConfig))),
					_Utils_Tuple2(
					'single-item-removal',
					$elm$json$Json$Encode$bool(
						function () {
							var _v7 = $author$project$SelectionMode$getSingleItemRemoval(selectionConfig);
							if (_v7.$ === 'EnableSingleItemRemoval') {
								return true;
							} else {
								return false;
							}
						}()))
				]));
	});
var $author$project$SearchString$encode = function (searchString) {
	return $elm$json$Json$Encode$string(
		$author$project$SearchString$toString(searchString));
};
var $author$project$PositiveInt$encode = function (_v0) {
	var positiveInt = _v0.a;
	return $elm$json$Json$Encode$int(positiveInt);
};
var $author$project$OutputStyle$encodeSearchStringMinimumLength = function (searchStringMinimumLength) {
	if (searchStringMinimumLength.$ === 'FixedSearchStringMinimumLength') {
		var positiveInt = searchStringMinimumLength.a;
		return $author$project$PositiveInt$encode(positiveInt);
	} else {
		return $elm$json$Json$Encode$int(0);
	}
};
var $author$project$OptionSearcher$encodeSearchParams = F4(
	function (searchString, searchStringMinimumLength, searchNonce, isClearingSearch) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'searchString',
					$author$project$SearchString$encode(searchString)),
					_Utils_Tuple2(
					'searchStringMinimumLength',
					$author$project$OutputStyle$encodeSearchStringMinimumLength(searchStringMinimumLength)),
					_Utils_Tuple2(
					'searchNonce',
					$elm$json$Json$Encode$int(searchNonce)),
					_Utils_Tuple2(
					'isClearingSearch',
					$elm$json$Json$Encode$bool(isClearingSearch))
				]));
	});
var $author$project$OptionsUtilities$filterOptionsToShowInDropdownByOptionDisplay = function (selectionConfig) {
	var _v0 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
	if (_v0.$ === 'SingleSelect') {
		return $elm$core$List$filter(
			function (option) {
				var _v1 = $author$project$Option$getOptionDisplay(option);
				switch (_v1.$) {
					case 'OptionShown':
						var age = _v1.a;
						if (age.$ === 'NewOption') {
							return false;
						} else {
							return true;
						}
					case 'OptionHidden':
						return false;
					case 'OptionSelected':
						var age = _v1.b;
						if (age.$ === 'NewOption') {
							return false;
						} else {
							return true;
						}
					case 'OptionSelectedPendingValidation':
						return true;
					case 'OptionSelectedAndInvalid':
						return false;
					case 'OptionSelectedHighlighted':
						return true;
					case 'OptionHighlighted':
						return true;
					case 'OptionDisabled':
						var age = _v1.a;
						if (age.$ === 'NewOption') {
							return false;
						} else {
							return true;
						}
					default:
						return true;
				}
			});
	} else {
		return $elm$core$List$filter(
			function (option) {
				var _v5 = $author$project$Option$getOptionDisplay(option);
				switch (_v5.$) {
					case 'OptionShown':
						var age = _v5.a;
						if (age.$ === 'NewOption') {
							return false;
						} else {
							return true;
						}
					case 'OptionHidden':
						return false;
					case 'OptionSelected':
						var age = _v5.b;
						if (age.$ === 'NewOption') {
							return false;
						} else {
							return true;
						}
					case 'OptionSelectedPendingValidation':
						return true;
					case 'OptionSelectedAndInvalid':
						return false;
					case 'OptionSelectedHighlighted':
						return false;
					case 'OptionHighlighted':
						return true;
					case 'OptionDisabled':
						var age = _v5.a;
						if (age.$ === 'NewOption') {
							return false;
						} else {
							return true;
						}
					default:
						return true;
				}
			});
	}
};
var $author$project$OptionSearchFilter$impossiblyLowScore = 1000000;
var $author$project$Option$getMaybeOptionSearchFilter = function (option) {
	switch (option.$) {
		case 'Option':
			var maybeOptionSearchFilter = option.f;
			return maybeOptionSearchFilter;
		case 'CustomOption':
			var maybeOptionSearchFilter = option.d;
			return maybeOptionSearchFilter;
		case 'EmptyOption':
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$maybe_extra$Maybe$Extra$cons = F2(
	function (item, list) {
		if (item.$ === 'Just') {
			var v = item.a;
			return A2($elm$core$List$cons, v, list);
		} else {
			return list;
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$values = A2($elm$core$List$foldr, $elm_community$maybe_extra$Maybe$Extra$cons, _List_Nil);
var $author$project$OptionsUtilities$optionSearchResultsBestScore = function (options) {
	return A2(
		$elm$core$List$map,
		function ($) {
			return $.bestScore;
		},
		$elm_community$maybe_extra$Maybe$Extra$values(
			A2($elm$core$List$map, $author$project$Option$getMaybeOptionSearchFilter, options)));
};
var $author$project$OptionsUtilities$findLowestSearchScore = function (options) {
	var lowSore = A3(
		$elm$core$List$foldl,
		F2(
			function (optionBestScore, lowScore) {
				return (_Utils_cmp(optionBestScore, lowScore) < 0) ? optionBestScore : lowScore;
			}),
		$author$project$OptionSearchFilter$impossiblyLowScore,
		$author$project$OptionsUtilities$optionSearchResultsBestScore(
			A2(
				$elm$core$List$filter,
				function (option) {
					return !$author$project$Option$isCustomOption(option);
				},
				options)));
	return _Utils_eq(lowSore, $author$project$OptionSearchFilter$impossiblyLowScore) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(lowSore);
};
var $author$project$OptionsUtilities$isOptionBelowScore = F2(
	function (score, option) {
		var _v0 = $author$project$Option$getMaybeOptionSearchFilter(option);
		if (_v0.$ === 'Just') {
			var optionSearchFilter = _v0.a;
			return _Utils_cmp(score, optionSearchFilter.bestScore) > -1;
		} else {
			return false;
		}
	});
var $author$project$OptionSearchFilter$lowScoreCutOff = function (score) {
	return (!score) ? 51 : ((score <= 10) ? 100 : ((score <= 100) ? 1000 : ((score <= 1000) ? 10000 : $author$project$OptionSearchFilter$impossiblyLowScore)));
};
var $author$project$OptionsUtilities$filterOptionsToShowInDropdownBySearchScore = function (options) {
	var _v0 = $author$project$OptionsUtilities$findLowestSearchScore(options);
	if (_v0.$ === 'Just') {
		var lowScore = _v0.a;
		return A2(
			$elm$core$List$filter,
			function (option) {
				return A2(
					$author$project$OptionsUtilities$isOptionBelowScore,
					$author$project$OptionSearchFilter$lowScoreCutOff(lowScore),
					option) || $author$project$Option$isCustomOption(option);
			},
			options);
	} else {
		return options;
	}
};
var $author$project$OptionsUtilities$filterOptionsToShowInDropdown = function (selectionConfig) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$OptionsUtilities$filterOptionsToShowInDropdownByOptionDisplay(selectionConfig),
		$author$project$OptionsUtilities$filterOptionsToShowInDropdownBySearchScore);
};
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $author$project$OptionDisplay$isHighlighted = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return false;
		case 'OptionHidden':
			return false;
		case 'OptionSelected':
			return false;
		case 'OptionSelectedAndInvalid':
			return false;
		case 'OptionSelectedPendingValidation':
			return false;
		case 'OptionSelectedHighlighted':
			return false;
		case 'OptionHighlighted':
			return true;
		case 'OptionDisabled':
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isOptionHighlighted = function (option) {
	switch (option.$) {
		case 'Option':
			var display = option.a;
			return $author$project$OptionDisplay$isHighlighted(display);
		case 'CustomOption':
			var display = option.a;
			return $author$project$OptionDisplay$isHighlighted(display);
		case 'EmptyOption':
			var display = option.a;
			return $author$project$OptionDisplay$isHighlighted(display);
		default:
			return false;
	}
};
var $author$project$OptionsUtilities$findHighlightedOptionIndex = function (options) {
	return A2(
		$elm_community$list_extra$List$Extra$findIndex,
		function (option) {
			return $author$project$Option$isOptionHighlighted(option);
		},
		options);
};
var $author$project$OptionsUtilities$findSelectedOptionIndex = function (options) {
	return A2(
		$elm_community$list_extra$List$Extra$findIndex,
		function (option) {
			return $author$project$Option$isOptionSelected(option);
		},
		options);
};
var $author$project$OptionsUtilities$findHighlightedOrSelectedOptionIndex = function (options) {
	var _v0 = $author$project$OptionsUtilities$findHighlightedOptionIndex(options);
	if (_v0.$ === 'Just') {
		var index = _v0.a;
		return $elm$core$Maybe$Just(index);
	} else {
		return $author$project$OptionsUtilities$findSelectedOptionIndex(options);
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$OptionsUtilities$sortOptionsByBestScore = function (options) {
	return A2(
		$elm$core$List$sortBy,
		function (option) {
			return $author$project$Option$isCustomOption(option) ? 1 : A2(
				$elm$core$Maybe$withDefault,
				$author$project$OptionSearchFilter$impossiblyLowScore,
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.bestScore;
					},
					$author$project$Option$getMaybeOptionSearchFilter(option)));
		},
		options);
};
var $author$project$MuchSelect$figureOutWhichOptionsToShowInTheDropdown = F2(
	function (selectionConfig, options) {
		var optionsThatCouldBeShown = $author$project$OptionsUtilities$sortOptionsByBestScore(
			A2($author$project$OptionsUtilities$filterOptionsToShowInDropdown, selectionConfig, options));
		var lastIndexOfOptions = $elm$core$List$length(optionsThatCouldBeShown) - 1;
		var _v0 = $author$project$SelectionMode$getMaxDropdownItems(selectionConfig);
		if (_v0.$ === 'FixedMaxDropdownItems') {
			var maxDropdownItems = _v0.a;
			var maxNumberOfDropdownItems = $author$project$PositiveInt$toInt(maxDropdownItems);
			if (_Utils_cmp(
				$elm$core$List$length(optionsThatCouldBeShown),
				maxNumberOfDropdownItems) < 1) {
				return optionsThatCouldBeShown;
			} else {
				var _v1 = $author$project$OptionsUtilities$findHighlightedOrSelectedOptionIndex(optionsThatCouldBeShown);
				if (_v1.$ === 'Just') {
					var index = _v1.a;
					if (!index) {
						return A2($elm$core$List$take, maxNumberOfDropdownItems, optionsThatCouldBeShown);
					} else {
						if (_Utils_eq(
							index,
							$elm$core$List$length(optionsThatCouldBeShown) - 1)) {
							return A2(
								$elm$core$List$drop,
								$elm$core$List$length(options) - maxNumberOfDropdownItems,
								optionsThatCouldBeShown);
						} else {
							var isEven = !A2($elm$core$Basics$modBy, 2, maxNumberOfDropdownItems);
							var half = isEven ? ((maxNumberOfDropdownItems / 2) | 0) : (((maxNumberOfDropdownItems / 2) | 0) + 1);
							return (_Utils_cmp(index + half, lastIndexOfOptions) > 0) ? A2(
								$elm$core$List$drop,
								$elm$core$List$length(options) - maxNumberOfDropdownItems,
								optionsThatCouldBeShown) : (((index - half) < 0) ? A2($elm$core$List$take, maxNumberOfDropdownItems, optionsThatCouldBeShown) : A2(
								$elm$core$List$take,
								maxNumberOfDropdownItems,
								A2($elm$core$List$drop, (index + 1) - half, options)));
						}
					}
				} else {
					return A2($elm$core$List$take, maxNumberOfDropdownItems, options);
				}
			}
		} else {
			return optionsThatCouldBeShown;
		}
	});
var $author$project$OptionsUtilities$findHighlightedOption = function (options) {
	return A2(
		$elm_community$list_extra$List$Extra$find,
		function (option) {
			return $author$project$Option$isOptionHighlighted(option);
		},
		options);
};
var $author$project$SelectedValueEncoding$fromString = function (string) {
	switch (string) {
		case 'json':
			return $elm$core$Result$Ok($author$project$SelectedValueEncoding$JsonEncoded);
		case 'comma':
			return $elm$core$Result$Ok($author$project$SelectedValueEncoding$CommaSeperated);
		default:
			return $elm$core$Result$Err('Invalid selected value encoding: ' + string);
	}
};
var $author$project$OutputStyle$getTransformAndValidateFromCustomOptions = function (customOptions) {
	if (customOptions.$ === 'AllowCustomOptions') {
		var valueTransformAndValidate = customOptions.b;
		return valueTransformAndValidate;
	} else {
		return $author$project$TransformAndValidate$empty;
	}
};
var $author$project$SelectionMode$getTransformAndValidate = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return $author$project$OutputStyle$getTransformAndValidateFromCustomOptions(singleSelectCustomHtmlFields.customOptions);
		} else {
			var valueTransformAndValidate = singleSelectOutputStyle.b;
			return valueTransformAndValidate;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return $author$project$OutputStyle$getTransformAndValidateFromCustomOptions(multiSelectCustomHtmlFields.customOptions);
		} else {
			var valueTransformAndValidate = multiSelectOutputStyle.b;
			return valueTransformAndValidate;
		}
	}
};
var $author$project$OptionDisplay$isHighlightedSelected = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return false;
		case 'OptionHidden':
			return false;
		case 'OptionSelected':
			return false;
		case 'OptionSelectedAndInvalid':
			return false;
		case 'OptionSelectedPendingValidation':
			return false;
		case 'OptionSelectedHighlighted':
			return true;
		case 'OptionHighlighted':
			return false;
		case 'OptionDisabled':
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isOptionSelectedHighlighted = function (option) {
	switch (option.$) {
		case 'Option':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isHighlightedSelected(optionDisplay);
		case 'CustomOption':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isHighlightedSelected(optionDisplay);
		case 'EmptyOption':
			var optionDisplay = option.a;
			return $author$project$OptionDisplay$isHighlightedSelected(optionDisplay);
		default:
			return false;
	}
};
var $author$project$OptionsUtilities$hasSelectedHighlightedOptions = function (options) {
	return A2($elm$core$List$any, $author$project$Option$isOptionSelectedHighlighted, options);
};
var $author$project$OptionsUtilities$highlightOptionInListByValue = F2(
	function (value, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				return A2($author$project$Option$optionValuesEqual, option_, value) ? $author$project$Option$highlightOption(option_) : $author$project$Option$removeHighlightFromOption(option_);
			},
			options);
	});
var $author$project$SearchString$isCleared = function (_v0) {
	var isCleared_ = _v0.b;
	return isCleared_;
};
var $author$project$RightSlot$isRightSlotTransitioning = function (rightSlot) {
	switch (rightSlot.$) {
		case 'ShowNothing':
			return false;
		case 'ShowLoadingIndicator':
			return false;
		case 'ShowDropdownIndicator':
			var transitioning = rightSlot.a;
			if (transitioning.$ === 'InFocusTransition') {
				return true;
			} else {
				return false;
			}
		case 'ShowClearButton':
			return false;
		case 'ShowAddButton':
			return false;
		default:
			return false;
	}
};
var $author$project$MuchSelect$ReportOptionSelected = function (a) {
	return {$: 'ReportOptionSelected', a: a};
};
var $author$project$MuchSelect$makeEffectsWhenSelectingAnOption = F5(
	function (newlySelectedOption, eventsMode, selectionMode, selectedValueEncoding, options) {
		var optionSelectedEffects = $author$project$MuchSelect$ReportOptionSelected(
			$author$project$Ports$optionEncoder(newlySelectedOption));
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[
					A4($author$project$MuchSelect$makeEffectsWhenValuesChanges, eventsMode, selectionMode, selectedValueEncoding, options),
					optionSelectedEffects
				]));
	});
var $author$project$OptionDisplay$isHighlightable = F2(
	function (selectionMode, optionDisplay) {
		switch (optionDisplay.$) {
			case 'OptionShown':
				return true;
			case 'OptionHidden':
				return false;
			case 'OptionSelected':
				if (selectionMode.$ === 'SingleSelect') {
					return true;
				} else {
					return false;
				}
			case 'OptionSelectedPendingValidation':
				return false;
			case 'OptionSelectedAndInvalid':
				return false;
			case 'OptionSelectedHighlighted':
				return false;
			case 'OptionHighlighted':
				return false;
			case 'OptionDisabled':
				return false;
			default:
				return true;
		}
	});
var $author$project$Option$optionIsHighlightable = F2(
	function (selectionConfig, option) {
		switch (option.$) {
			case 'Option':
				var display = option.a;
				return A2(
					$author$project$OptionDisplay$isHighlightable,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					display);
			case 'CustomOption':
				var display = option.a;
				return A2(
					$author$project$OptionDisplay$isHighlightable,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					display);
			case 'EmptyOption':
				var display = option.a;
				return A2(
					$author$project$OptionDisplay$isHighlightable,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					display);
			default:
				return false;
		}
	});
var $elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $author$project$OptionsUtilities$findClosestHighlightableOptionGoingDown = F3(
	function (selectionConfig, index, options) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			$author$project$Option$optionIsHighlightable(selectionConfig),
			A2($elm_community$list_extra$List$Extra$splitAt, index, options).b);
	});
var $author$project$OptionsUtilities$moveHighlightedOptionDown = F3(
	function (selectionConfig, allOptions, visibleOptions) {
		var maybeLowerSibling = A2(
			$elm$core$Maybe$andThen,
			function (index) {
				return A3($author$project$OptionsUtilities$findClosestHighlightableOptionGoingDown, selectionConfig, index, visibleOptions);
			},
			$author$project$OptionsUtilities$findHighlightedOrSelectedOptionIndex(visibleOptions));
		if (maybeLowerSibling.$ === 'Just') {
			var option = maybeLowerSibling.a;
			return A2($author$project$OptionsUtilities$highlightOptionInList, option, allOptions);
		} else {
			var _v1 = A3($author$project$OptionsUtilities$findClosestHighlightableOptionGoingDown, selectionConfig, 0, visibleOptions);
			if (_v1.$ === 'Just') {
				var firstOption = _v1.a;
				return A2($author$project$OptionsUtilities$highlightOptionInList, firstOption, allOptions);
			} else {
				return allOptions;
			}
		}
	});
var $author$project$OptionsUtilities$findClosestHighlightableOptionGoingUp = F3(
	function (selectionConfig, index, options) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			$author$project$Option$optionIsHighlightable(selectionConfig),
			$elm$core$List$reverse(
				A2($elm_community$list_extra$List$Extra$splitAt, index, options).a));
	});
var $author$project$OptionsUtilities$moveHighlightedOptionUp = F3(
	function (selectionConfig, allOptions, visibleOptions) {
		var maybeHigherSibling = A2(
			$elm$core$Maybe$andThen,
			function (index) {
				return A3($author$project$OptionsUtilities$findClosestHighlightableOptionGoingUp, selectionConfig, index, visibleOptions);
			},
			$author$project$OptionsUtilities$findHighlightedOrSelectedOptionIndex(visibleOptions));
		if (maybeHigherSibling.$ === 'Just') {
			var option = maybeHigherSibling.a;
			return A2($author$project$OptionsUtilities$highlightOptionInList, option, allOptions);
		} else {
			var _v1 = $elm$core$List$head(visibleOptions);
			if (_v1.$ === 'Just') {
				var firstOption = _v1.a;
				return A2($author$project$OptionsUtilities$highlightOptionInList, firstOption, allOptions);
			} else {
				return allOptions;
			}
		}
	});
var $author$project$OptionsUtilities$notSelectedOptions = function (options) {
	return A2(
		$elm$core$List$sortBy,
		$author$project$Option$getOptionSelectedIndex,
		A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $author$project$Option$isOptionSelected),
			options));
};
var $grotsev$elm_debouncer$Bounce$push = function (_v0) {
	var counter = _v0.a;
	return $grotsev$elm_debouncer$Bounce$Bounce(counter + 1);
};
var $author$project$OptionsUtilities$removeHighlightOptionInList = F2(
	function (value, options) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				return A2($author$project$Option$optionValuesEqual, option_, value) ? $author$project$Option$removeHighlightFromOption(option_) : option_;
			},
			options);
	});
var $author$project$OptionsUtilities$removeOptionFromOptionListBySelectedIndex = F2(
	function (selectedIndex, options) {
		return $author$project$OptionsUtilities$reIndexSelectedOptions(
			A2(
				$elm$core$List$filter,
				function (option) {
					return !_Utils_eq(
						$author$project$Option$getOptionSelectedIndex(option),
						selectedIndex);
				},
				options));
	});
var $author$project$OptionsUtilities$selectOptionInListWithIndex = F2(
	function (optionToSelect, options) {
		var optionValue = $author$project$Option$getOptionValue(optionToSelect);
		var notLessThanZero = function (index) {
			return (index < 0) ? 0 : index;
		};
		var selectionIndex = notLessThanZero(
			$author$project$Option$getOptionSelectedIndex(optionToSelect));
		return A3($author$project$OptionsUtilities$selectOptionInListByOptionValueWithIndex, selectionIndex, optionValue, options);
	});
var $author$project$OptionsUtilities$selectOptionsInListWithIndex = F2(
	function (optionsToSelect, options) {
		var helper = F2(
			function (newOptions, optionToSelect) {
				return _Utils_Tuple2(
					A2($author$project$OptionsUtilities$selectOptionInListWithIndex, optionToSelect, newOptions),
					_List_Nil);
			});
		return A3($elm_community$list_extra$List$Extra$mapAccuml, helper, options, optionsToSelect).a;
	});
var $author$project$OptionsUtilities$setSelectedOptionInNewOptions = F3(
	function (selectionMode, oldOptions, newOptions) {
		var oldSelectedOption = $author$project$OptionsUtilities$selectedOptions(oldOptions);
		var newSelectedOptions = A2(
			$elm$core$List$filter,
			function (newOption_) {
				return A2($author$project$OptionsUtilities$optionListContainsOptionWithValue, newOption_, oldSelectedOption);
			},
			newOptions);
		if (selectionMode.$ === 'SingleSelect') {
			return A2(
				$author$project$OptionsUtilities$selectOptionsInListWithIndex,
				A2($elm$core$List$take, 1, newSelectedOptions),
				$author$project$OptionsUtilities$deselectAllOptionsInOptionsList(newOptions));
		} else {
			return A2($author$project$OptionsUtilities$selectOptionsInListWithIndex, newSelectedOptions, newOptions);
		}
	});
var $author$project$OptionsUtilities$mergeTwoListsOfOptionsPreservingSelectedOptions = F4(
	function (selectionMode, selectedItemPlacementMode, optionsA, optionsB) {
		var updatedOptionsB = A2(
			$elm$core$List$map,
			function (optionB) {
				var _v2 = A2(
					$author$project$OptionsUtilities$findOptionByOptionValue,
					$author$project$Option$getOptionValue(optionB),
					optionsA);
				if (_v2.$ === 'Just') {
					var optionA = _v2.a;
					return A2($author$project$Option$merge2Options, optionA, optionB);
				} else {
					return optionB;
				}
			},
			optionsB);
		var updatedOptionsA = A2(
			$elm$core$List$map,
			function (optionA) {
				var _v1 = A2(
					$author$project$OptionsUtilities$findOptionByOptionValue,
					$author$project$Option$getOptionValue(optionA),
					optionsB);
				if (_v1.$ === 'Just') {
					var optionB = _v1.a;
					return A2($author$project$Option$merge2Options, optionA, optionB);
				} else {
					return optionA;
				}
			},
			optionsA);
		var superList = function () {
			switch (selectedItemPlacementMode.$) {
				case 'SelectedItemStaysInPlace':
					return _Utils_ap(updatedOptionsB, updatedOptionsA);
				case 'SelectedItemMovesToTheTop':
					return _Utils_ap(updatedOptionsA, updatedOptionsB);
				default:
					return _Utils_ap(updatedOptionsB, updatedOptionsA);
			}
		}();
		var newOptions = A2($elm_community$list_extra$List$Extra$uniqueBy, $author$project$Option$getOptionValueAsString, superList);
		return A3($author$project$OptionsUtilities$setSelectedOptionInNewOptions, selectionMode, superList, newOptions);
	});
var $author$project$Option$transformOptionForOutputStyle = F2(
	function (outputStyle, option) {
		if (outputStyle.$ === 'CustomHtml') {
			switch (option.$) {
				case 'Option':
					return $elm$core$Maybe$Just(option);
				case 'CustomOption':
					return $elm$core$Maybe$Just(option);
				case 'DatalistOption':
					var optionDisplay = option.a;
					var optionValue = option.b;
					return $elm$core$Maybe$Just(
						A6(
							$author$project$Option$Option,
							optionDisplay,
							$author$project$OptionLabel$new(
								$author$project$OptionValue$optionValueToString(optionValue)),
							optionValue,
							$author$project$Option$NoDescription,
							$author$project$Option$NoOptionGroup,
							$elm$core$Maybe$Nothing));
				default:
					return $elm$core$Maybe$Just(option);
			}
		} else {
			switch (option.$) {
				case 'Option':
					var optionDisplay = option.a;
					var optionValue = option.c;
					return $elm$core$Maybe$Just(
						A2($author$project$Option$DatalistOption, optionDisplay, optionValue));
				case 'CustomOption':
					var optionDisplay = option.a;
					var optionValue = option.c;
					return $elm$core$Maybe$Just(
						A2($author$project$Option$DatalistOption, optionDisplay, optionValue));
				case 'DatalistOption':
					return $elm$core$Maybe$Just(option);
				default:
					return $elm$core$Maybe$Nothing;
			}
		}
	});
var $author$project$OptionsUtilities$transformOptionsToOutputStyle = F2(
	function (outputStyle, options) {
		return $elm_community$maybe_extra$Maybe$Extra$values(
			A2(
				$elm$core$List$map,
				$author$project$Option$transformOptionForOutputStyle(outputStyle),
				options));
	});
var $author$project$OptionsUtilities$replaceOptions = F3(
	function (selectionConfig, oldOptions, newOptions) {
		var oldSelectedOptions = function () {
			var _v2 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (_v2.$ === 'SingleSelect') {
				return $author$project$OptionsUtilities$hasSelectedOption(newOptions) ? _List_Nil : $author$project$OptionsUtilities$selectedOptions(oldOptions);
			} else {
				return A2(
					$author$project$OptionsUtilities$transformOptionsToOutputStyle,
					$author$project$SelectionMode$getOutputStyle(selectionConfig),
					$author$project$OptionsUtilities$selectedOptions(oldOptions));
			}
		}();
		var _v0 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
		if (_v0.$ === 'CustomHtml') {
			var _v1 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (_v1.$ === 'SingleSelect') {
				return A4(
					$author$project$OptionsUtilities$mergeTwoListsOfOptionsPreservingSelectedOptions,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					$author$project$SelectionMode$getSelectedItemPlacementMode(selectionConfig),
					oldSelectedOptions,
					newOptions);
			} else {
				return A4(
					$author$project$OptionsUtilities$mergeTwoListsOfOptionsPreservingSelectedOptions,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					$author$project$OutputStyle$SelectedItemStaysInPlace,
					oldSelectedOptions,
					newOptions);
			}
		} else {
			var optionsForTheDatasetHints = $author$project$OptionsUtilities$removeEmptyOptions(
				A2(
					$elm_community$list_extra$List$Extra$uniqueBy,
					$author$project$Option$getOptionValue,
					A2(
						$elm$core$List$map,
						$author$project$Option$deselectOption,
						A2(
							$elm$core$List$filter,
							A2($elm$core$Basics$composeR, $author$project$Option$isOptionSelected, $elm$core$Basics$not),
							newOptions))));
			var newSelectedOptions = oldSelectedOptions;
			return _Utils_ap(newSelectedOptions, optionsForTheDatasetHints);
		}
	});
var $author$project$OptionsUtilities$clearAnyUnselectedCustomOptions = function (options) {
	return A2(
		$elm$core$List$filter,
		function (option) {
			return !($author$project$Option$isCustomOption(option) && (!$author$project$Option$isOptionSelected(option)));
		},
		options);
};
var $author$project$OptionsUtilities$selectEmptyOption = function (options) {
	return A2(
		$elm$core$List$map,
		function (option_) {
			switch (option_.$) {
				case 'Option':
					return $author$project$Option$deselectOption(option_);
				case 'CustomOption':
					return $author$project$Option$deselectOption(option_);
				case 'EmptyOption':
					return A2($author$project$Option$selectOption, 0, option_);
				default:
					return $author$project$Option$deselectOption(option_);
			}
		},
		options);
};
var $author$project$OptionsUtilities$selectHighlightedOption = F2(
	function (selectionMode, options) {
		return function (maybeOption) {
			if (maybeOption.$ === 'Just') {
				var option = maybeOption.a;
				switch (option.$) {
					case 'Option':
						var value = option.c;
						if (selectionMode.$ === 'MultiSelectConfig') {
							return $author$project$OptionsUtilities$clearAnyUnselectedCustomOptions(
								A2($author$project$OptionsUtilities$selectOptionInListByOptionValue, value, options));
						} else {
							return A2($author$project$OptionsUtilities$selectSingleOptionInList, value, options);
						}
					case 'CustomOption':
						var value = option.c;
						if (selectionMode.$ === 'MultiSelectConfig') {
							return A2($author$project$OptionsUtilities$selectOptionInListByOptionValue, value, options);
						} else {
							return A2($author$project$OptionsUtilities$selectSingleOptionInList, value, options);
						}
					case 'EmptyOption':
						if (selectionMode.$ === 'MultiSelectConfig') {
							return $author$project$OptionsUtilities$selectEmptyOption(options);
						} else {
							return $author$project$OptionsUtilities$selectEmptyOption(options);
						}
					default:
						return options;
				}
			} else {
				return options;
			}
		}(
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (option) {
						return $author$project$Option$isOptionHighlighted(option);
					},
					options)));
	});
var $author$project$OptionsUtilities$selectedOptionValuesAreEqual = F2(
	function (valuesAsStrings, options) {
		return _Utils_eq(
			$author$project$OptionsUtilities$optionsValues(
				$author$project$OptionsUtilities$selectedOptions(options)),
			valuesAsStrings);
	});
var $author$project$OptionDisplay$setAge = F2(
	function (optionAge, optionDisplay) {
		switch (optionDisplay.$) {
			case 'OptionShown':
				return $author$project$OptionDisplay$OptionShown(optionAge);
			case 'OptionHidden':
				return optionDisplay;
			case 'OptionSelected':
				var _int = optionDisplay.a;
				return A2($author$project$OptionDisplay$OptionSelected, _int, optionAge);
			case 'OptionSelectedAndInvalid':
				return optionDisplay;
			case 'OptionSelectedPendingValidation':
				return optionDisplay;
			case 'OptionSelectedHighlighted':
				return optionDisplay;
			case 'OptionHighlighted':
				return optionDisplay;
			case 'OptionDisabled':
				return $author$project$OptionDisplay$OptionDisabled(optionAge);
			default:
				return $author$project$OptionDisplay$OptionActivated;
		}
	});
var $author$project$Option$setOptionDisplayAge = F2(
	function (optionAge, option) {
		return A2(
			$author$project$Option$setOptionDisplay,
			A2(
				$author$project$OptionDisplay$setAge,
				optionAge,
				$author$project$Option$getOptionDisplay(option)),
			option);
	});
var $author$project$OptionsUtilities$setAge = F2(
	function (optionAge, options) {
		return A2(
			$elm$core$List$map,
			$author$project$Option$setOptionDisplayAge(optionAge),
			options);
	});
var $author$project$SelectionMode$setCustomOptions = F2(
	function (customOptions, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{customOptions: customOptions})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{customOptions: customOptions})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$SelectionMode$setAllowCustomOptionsWithBool = F3(
	function (allowCustomOptions, customOptionHint, selectionConfig) {
		var transformAndValidate = $author$project$SelectionMode$getTransformAndValidate(selectionConfig);
		var newAllowCustomOptions = allowCustomOptions ? A2($author$project$OutputStyle$AllowCustomOptions, customOptionHint, transformAndValidate) : $author$project$OutputStyle$NoCustomOptions;
		return A2($author$project$SelectionMode$setCustomOptions, newAllowCustomOptions, selectionConfig);
	});
var $author$project$SelectionMode$setCustomOptionHint = F2(
	function (hint, selectionConfig) {
		var _v0 = $author$project$SelectionMode$getCustomOptionHint(selectionConfig);
		if (_v0.$ === 'Just') {
			var transformAndValidate = $author$project$SelectionMode$getTransformAndValidate(selectionConfig);
			var newAllowCustomOptions = A2(
				$author$project$OutputStyle$AllowCustomOptions,
				$elm$core$Maybe$Just(hint),
				transformAndValidate);
			return A2($author$project$SelectionMode$setCustomOptions, newAllowCustomOptions, selectionConfig);
		} else {
			return selectionConfig;
		}
	});
var $author$project$SelectionMode$setDropdownStyle = F2(
	function (dropdownStyle, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{dropdownStyle: dropdownStyle})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{dropdownStyle: dropdownStyle})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$OutputStyle$setEventsModeMultiSelect = F2(
	function (eventsMode, multiSelectOutputStyle) {
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return $author$project$OutputStyle$MultiSelectCustomHtml(
				_Utils_update(
					multiSelectCustomHtmlFields,
					{eventsMode: eventsMode}));
		} else {
			var valueTransformAndValidate = multiSelectOutputStyle.b;
			return A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, valueTransformAndValidate);
		}
	});
var $author$project$OutputStyle$setEventsModeSingleSelect = F2(
	function (eventsMode, singleSelectOutputStyle) {
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return $author$project$OutputStyle$SingleSelectCustomHtml(
				_Utils_update(
					singleSelectCustomHtmlFields,
					{eventsMode: eventsMode}));
		} else {
			var valueTransformAndValidate = singleSelectOutputStyle.b;
			return A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, valueTransformAndValidate);
		}
	});
var $author$project$SelectionMode$setEventsMode = F2(
	function (eventsMode, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return A3(
				$author$project$SelectionMode$SingleSelectConfig,
				A2($author$project$OutputStyle$setEventsModeSingleSelect, eventsMode, singleSelectOutputStyle),
				placeholder,
				interactionState);
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return A3(
				$author$project$SelectionMode$MultiSelectConfig,
				A2($author$project$OutputStyle$setEventsModeMultiSelect, eventsMode, multiSelectOutputStyle),
				placeholder,
				interactionState);
		}
	});
var $author$project$SelectionMode$setEventsOnly = F2(
	function (bool, selectionConfig) {
		var newEventsMode = bool ? $author$project$OutputStyle$EventsOnly : $author$project$OutputStyle$AllowLightDomChanges;
		return A2($author$project$SelectionMode$setEventsMode, newEventsMode, selectionConfig);
	});
var $author$project$SelectionMode$setInteractionState = F2(
	function (newInteractionState, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			return A3($author$project$SelectionMode$SingleSelectConfig, singleSelectOutputStyle, placeholder, newInteractionState);
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			return A3($author$project$SelectionMode$MultiSelectConfig, multiSelectOutputStyle, placeholder, newInteractionState);
		}
	});
var $author$project$SelectionMode$setIsDisabled = F2(
	function (isDisabled_, selectionConfig) {
		return isDisabled_ ? A2($author$project$SelectionMode$setInteractionState, $author$project$SelectionMode$Disabled, selectionConfig) : A2($author$project$SelectionMode$setInteractionState, $author$project$SelectionMode$Unfocused, selectionConfig);
	});
var $author$project$SelectionMode$Focused = {$: 'Focused'};
var $author$project$SelectionMode$setIsFocused = F2(
	function (isFocused_, selectionConfig) {
		var newInteractionState = isFocused_ ? $author$project$SelectionMode$Focused : $author$project$SelectionMode$Unfocused;
		return A2($author$project$SelectionMode$setInteractionState, newInteractionState, selectionConfig);
	});
var $author$project$SelectionMode$setMaxDropdownItems = F2(
	function (maxDropdownItems, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{maxDropdownItems: maxDropdownItems})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{maxDropdownItems: maxDropdownItems})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$OutputStyle$multiToSingle = function (multiSelectOutputStyle) {
	if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
		var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
		return $author$project$OutputStyle$SingleSelectCustomHtml(
			{customOptions: multiSelectCustomHtmlFields.customOptions, dropdownState: multiSelectCustomHtmlFields.dropdownState, dropdownStyle: multiSelectCustomHtmlFields.dropdownStyle, eventsMode: multiSelectCustomHtmlFields.eventsMode, maxDropdownItems: multiSelectCustomHtmlFields.maxDropdownItems, searchStringMinimumLength: multiSelectCustomHtmlFields.searchStringMinimumLength, selectedItemPlacementMode: $author$project$OutputStyle$SelectedItemStaysInPlace});
	} else {
		var eventsMode = multiSelectOutputStyle.a;
		var transformAndValidate = multiSelectOutputStyle.b;
		return A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, transformAndValidate);
	}
};
var $author$project$OutputStyle$singleToMulti = function (singleSelectOutputStyle) {
	if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
		var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
		return $author$project$OutputStyle$MultiSelectCustomHtml(
			{customOptions: singleSelectCustomHtmlFields.customOptions, dropdownState: singleSelectCustomHtmlFields.dropdownState, dropdownStyle: singleSelectCustomHtmlFields.dropdownStyle, eventsMode: singleSelectCustomHtmlFields.eventsMode, maxDropdownItems: singleSelectCustomHtmlFields.maxDropdownItems, searchStringMinimumLength: singleSelectCustomHtmlFields.searchStringMinimumLength, singleItemRemoval: $author$project$OutputStyle$DisableSingleItemRemoval});
	} else {
		var eventsMode = singleSelectOutputStyle.a;
		var transformAndValidate = singleSelectOutputStyle.b;
		return A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, transformAndValidate);
	}
};
var $author$project$SelectionMode$setMultiSelectModeWithBool = F2(
	function (isInMultiSelectMode, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return isInMultiSelectMode ? A3(
				$author$project$SelectionMode$MultiSelectConfig,
				$author$project$OutputStyle$singleToMulti(singleSelectOutputStyle),
				placeholder,
				interactionState) : selectionConfig;
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return isInMultiSelectMode ? selectionConfig : A3(
				$author$project$SelectionMode$SingleSelectConfig,
				$author$project$OutputStyle$multiToSingle(multiSelectOutputStyle),
				placeholder,
				interactionState);
		}
	});
var $author$project$OutputStyle$defaultMultiSelectCustomHtmlFields = {
	customOptions: $author$project$OutputStyle$NoCustomOptions,
	dropdownState: $author$project$OutputStyle$Collapsed,
	dropdownStyle: $author$project$OutputStyle$NoFooter,
	eventsMode: $author$project$OutputStyle$AllowLightDomChanges,
	maxDropdownItems: $author$project$OutputStyle$NoLimitToDropdownItems,
	searchStringMinimumLength: $author$project$OutputStyle$FixedSearchStringMinimumLength(
		$author$project$PositiveInt$new(2)),
	singleItemRemoval: $author$project$OutputStyle$EnableSingleItemRemoval
};
var $author$project$OutputStyle$defaultSingleSelectCustomHtmlFields = {
	customOptions: $author$project$OutputStyle$NoCustomOptions,
	dropdownState: $author$project$OutputStyle$Collapsed,
	dropdownStyle: $author$project$OutputStyle$NoFooter,
	eventsMode: $author$project$OutputStyle$AllowLightDomChanges,
	maxDropdownItems: $author$project$OutputStyle$NoLimitToDropdownItems,
	searchStringMinimumLength: $author$project$OutputStyle$FixedSearchStringMinimumLength(
		$author$project$PositiveInt$new(2)),
	selectedItemPlacementMode: $author$project$OutputStyle$SelectedItemStaysInPlace
};
var $author$project$SelectionMode$setOutputStyle = F2(
	function (outputStyle, selectionConfig) {
		if (outputStyle.$ === 'CustomHtml') {
			if (selectionConfig.$ === 'SingleSelectConfig') {
				var singleSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
					return selectionConfig;
				} else {
					return A3(
						$author$project$SelectionMode$SingleSelectConfig,
						$author$project$OutputStyle$SingleSelectCustomHtml($author$project$OutputStyle$defaultSingleSelectCustomHtmlFields),
						placeholder,
						interactionState);
				}
			} else {
				var multiSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
					return selectionConfig;
				} else {
					return A3(
						$author$project$SelectionMode$MultiSelectConfig,
						$author$project$OutputStyle$MultiSelectCustomHtml($author$project$OutputStyle$defaultMultiSelectCustomHtmlFields),
						placeholder,
						interactionState);
				}
			}
		} else {
			if (selectionConfig.$ === 'SingleSelectConfig') {
				var singleSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
					var fields = singleSelectOutputStyle.a;
					return A3(
						$author$project$SelectionMode$SingleSelectConfig,
						A2(
							$author$project$OutputStyle$SingleSelectDatalist,
							fields.eventsMode,
							$author$project$OutputStyle$getTransformAndValidateFromCustomOptions(fields.customOptions)),
						placeholder,
						interactionState);
				} else {
					return selectionConfig;
				}
			} else {
				var multiSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
					var fields = multiSelectOutputStyle.a;
					return A3(
						$author$project$SelectionMode$MultiSelectConfig,
						A2(
							$author$project$OutputStyle$MultiSelectDataList,
							fields.eventsMode,
							$author$project$OutputStyle$getTransformAndValidateFromCustomOptions(fields.customOptions)),
						placeholder,
						interactionState);
				} else {
					return selectionConfig;
				}
			}
		}
	});
var $author$project$SelectionMode$setPlaceholder = F2(
	function (placeholder, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var interactionState = selectionConfig.c;
			return A3($author$project$SelectionMode$SingleSelectConfig, singleSelectOutputStyle, placeholder, interactionState);
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var interactionState = selectionConfig.c;
			return A3($author$project$SelectionMode$MultiSelectConfig, multiSelectOutputStyle, placeholder, interactionState);
		}
	});
var $author$project$SelectionMode$setSearchStringMinimumLength = F2(
	function (newSearchStringMinimumLength, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{searchStringMinimumLength: newSearchStringMinimumLength})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{searchStringMinimumLength: newSearchStringMinimumLength})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$SelectionMode$setSelectedItemPlacementMode = F2(
	function (selectedItemPlacementMode, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{selectedItemPlacementMode: selectedItemPlacementMode})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			return selectionConfig;
		}
	});
var $author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool = F2(
	function (selectedItemStaysInPlace, selectionConfig) {
		return selectedItemStaysInPlace ? A2($author$project$SelectionMode$setSelectedItemPlacementMode, $author$project$OutputStyle$SelectedItemStaysInPlace, selectionConfig) : A2($author$project$SelectionMode$setSelectedItemPlacementMode, $author$project$OutputStyle$SelectedItemMovesToTheTop, selectionConfig);
	});
var $author$project$OutputStyle$Expanded = {$: 'Expanded'};
var $author$project$SelectionMode$setShowDropdown = F2(
	function (showDropdown_, selectionConfig) {
		var newDropdownState = showDropdown_ ? $author$project$OutputStyle$Expanded : $author$project$OutputStyle$Collapsed;
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{dropdownState: newDropdownState})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{dropdownState: newDropdownState})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$SelectionMode$setSingleItemRemoval = F2(
	function (newSingleItemRemoval, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			return selectionConfig;
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{singleItemRemoval: newSingleItemRemoval})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$OutputStyle$setTransformAndValidateFromCustomOptions = F2(
	function (newTransformAndValidate, customOptions) {
		if (customOptions.$ === 'AllowCustomOptions') {
			var hint = customOptions.a;
			return A2($author$project$OutputStyle$AllowCustomOptions, hint, newTransformAndValidate);
		} else {
			return customOptions;
		}
	});
var $author$project$SelectionMode$setTransformAndValidate = F2(
	function (newTransformAndValidate, selectionConfig) {
		if (selectionConfig.$ === 'SingleSelectConfig') {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				var newSingleSelectCustomFields = _Utils_update(
					singleSelectCustomHtmlFields,
					{
						customOptions: A2($author$project$OutputStyle$setTransformAndValidateFromCustomOptions, newTransformAndValidate, singleSelectCustomHtmlFields.customOptions)
					});
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(newSingleSelectCustomFields),
					placeholder,
					interactionState);
			} else {
				var eventsMode = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, newTransformAndValidate),
					placeholder,
					interactionState);
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				var newMultiSelectCustomHtmlFields = _Utils_update(
					multiSelectCustomHtmlFields,
					{
						customOptions: A2($author$project$OutputStyle$setTransformAndValidateFromCustomOptions, newTransformAndValidate, multiSelectCustomHtmlFields.customOptions)
					});
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(newMultiSelectCustomHtmlFields),
					placeholder,
					interactionState);
			} else {
				var eventsMode = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, newTransformAndValidate),
					placeholder,
					interactionState);
			}
		}
	});
var $author$project$OptionsUtilities$toggleSelectedHighlightByOptionValue = F2(
	function (options, optionValue) {
		return A2(
			$elm$core$List$map,
			function (option_) {
				switch (option_.$) {
					case 'Option':
						var optionDisplay = option_.a;
						var optionValue_ = option_.c;
						if (_Utils_eq(optionValue, optionValue_)) {
							switch (optionDisplay.$) {
								case 'OptionShown':
									return option_;
								case 'OptionHidden':
									return option_;
								case 'OptionSelected':
									var selectedIndex = optionDisplay.a;
									return A2(
										$author$project$Option$setOptionDisplay,
										$author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex),
										option_);
								case 'OptionSelectedPendingValidation':
									return option_;
								case 'OptionSelectedAndInvalid':
									return option_;
								case 'OptionSelectedHighlighted':
									var selectedIndex = optionDisplay.a;
									return A2(
										$author$project$Option$setOptionDisplay,
										A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption),
										option_);
								case 'OptionHighlighted':
									return option_;
								case 'OptionDisabled':
									return option_;
								default:
									return option_;
							}
						} else {
							return option_;
						}
					case 'CustomOption':
						var optionDisplay = option_.a;
						var optionValue_ = option_.c;
						if (_Utils_eq(optionValue, optionValue_)) {
							switch (optionDisplay.$) {
								case 'OptionShown':
									return option_;
								case 'OptionHidden':
									return option_;
								case 'OptionSelected':
									var selectedIndex = optionDisplay.a;
									return A2(
										$author$project$Option$setOptionDisplay,
										$author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex),
										option_);
								case 'OptionSelectedPendingValidation':
									return option_;
								case 'OptionSelectedAndInvalid':
									return option_;
								case 'OptionSelectedHighlighted':
									var selectedIndex = optionDisplay.a;
									return A2(
										$author$project$Option$setOptionDisplay,
										A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption),
										option_);
								case 'OptionHighlighted':
									return option_;
								case 'OptionDisabled':
									return option_;
								default:
									return option_;
							}
						} else {
							return option_;
						}
					case 'EmptyOption':
						return option_;
					default:
						return option_;
				}
			},
			options);
	});
var $author$project$TransformAndValidate$transformAndValidateFirstPass = F3(
	function (_v0, string, selectedValueIndex) {
		var transformers = _v0.a;
		var validators = _v0.b;
		var transformedString = A3(
			$elm_community$list_extra$List$Extra$mapAccuml,
			F2(
				function (str, t) {
					return _Utils_Tuple2(
						A2($author$project$TransformAndValidate$transform, t, str),
						t);
				}),
			string,
			transformers).a;
		return A2(
			$author$project$TransformAndValidate$rollUpErrors,
			transformedString,
			A2(
				$elm$core$List$map,
				function (validator) {
					return A3($author$project$TransformAndValidate$validate, validator, transformedString, selectedValueIndex);
				},
				validators));
	});
var $author$project$TransformAndValidate$getSelectedValueIndexFromCustomValidationResult = function (customValidationResult) {
	if (customValidationResult.$ === 'CustomValidationPass') {
		var selectedValueIndex = customValidationResult.b;
		return selectedValueIndex;
	} else {
		var selectedValueIndex = customValidationResult.b;
		return selectedValueIndex;
	}
};
var $author$project$TransformAndValidate$getValueStringFromCustomValidationResult = function (customValidationResult) {
	if (customValidationResult.$ === 'CustomValidationPass') {
		var string = customValidationResult.a;
		return string;
	} else {
		var string = customValidationResult.a;
		return string;
	}
};
var $author$project$TransformAndValidate$transformAndValidateSecondPass = F2(
	function (_v0, customValidationResult) {
		var transformers = _v0.a;
		var validators = _v0.b;
		var valueString = $author$project$TransformAndValidate$getValueStringFromCustomValidationResult(customValidationResult);
		var transformedString = A3(
			$elm_community$list_extra$List$Extra$mapAccuml,
			F2(
				function (str, t) {
					return _Utils_Tuple2(
						A2($author$project$TransformAndValidate$transform, t, str),
						t);
				}),
			valueString,
			transformers).a;
		var selectedValueIndex = $author$project$TransformAndValidate$getSelectedValueIndexFromCustomValidationResult(customValidationResult);
		return A2(
			$author$project$TransformAndValidate$rollUpErrors,
			transformedString,
			A2(
				$elm$core$List$map,
				function (result) {
					switch (result.$) {
						case 'ValidationPass':
							return result;
						case 'ValidationFailed':
							return result;
						default:
							if (customValidationResult.$ === 'CustomValidationPass') {
								var selectedValueIndex_ = customValidationResult.b;
								return A2($author$project$TransformAndValidate$ValidationPass, valueString, selectedValueIndex_);
							} else {
								var valueString_ = customValidationResult.a;
								var selectedValueIndex_ = customValidationResult.b;
								var errorMessage = customValidationResult.c;
								return A3($author$project$TransformAndValidate$ValidationFailed, valueString_, selectedValueIndex_, errorMessage);
							}
					}
				},
				A2(
					$elm$core$List$map,
					function (validator) {
						return A3($author$project$TransformAndValidate$validate, validator, transformedString, selectedValueIndex);
					},
					validators)));
	});
var $author$project$OptionsUtilities$unhighlightSelectedOptions = $elm$core$List$map($author$project$Option$removeHighlightFromOption);
var $author$project$SearchString$update = function (string) {
	return A2($author$project$SearchString$SearchString, string, false);
};
var $author$project$OptionsUtilities$updateAge = F4(
	function (outputStyle, searchString, searchStringMinimumLength, options) {
		if (outputStyle.$ === 'CustomHtml') {
			if (searchStringMinimumLength.$ === 'FixedSearchStringMinimumLength') {
				var min = searchStringMinimumLength.a;
				return (_Utils_cmp(
					$author$project$SearchString$length(searchString),
					$author$project$PositiveInt$toInt(min)) > 0) ? options : A2($author$project$OptionsUtilities$setAge, $author$project$OptionDisplay$MatureOption, options);
			} else {
				return options;
			}
		} else {
			return A2($author$project$OptionsUtilities$setAge, $author$project$OptionDisplay$MatureOption, options);
		}
	});
var $author$project$Option$hasSelectedItemIndex = F2(
	function (selectedItemIndex, option) {
		return _Utils_eq(
			$author$project$Option$getOptionSelectedIndex(option),
			selectedItemIndex);
	});
var $author$project$OptionDisplay$selectedAndPendingValidation = function (index) {
	return $author$project$OptionDisplay$OptionSelectedPendingValidation(index);
};
var $author$project$Option$newSelectedDatalistOptionPendingValidation = F2(
	function (optionValue, selectedIndex) {
		return A2(
			$author$project$Option$DatalistOption,
			$author$project$OptionDisplay$selectedAndPendingValidation(selectedIndex),
			optionValue);
	});
var $author$project$Option$setOptionValue = F2(
	function (optionValue, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				var optionDescription = option.d;
				var optionGroup = option.e;
				var maybeOptionSearchFilter = option.f;
				return A6($author$project$Option$Option, optionDisplay, optionLabel, optionValue, optionDescription, optionGroup, maybeOptionSearchFilter);
			case 'CustomOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				var maybeOptionSearchFilter = option.d;
				return A4($author$project$Option$CustomOption, optionDisplay, optionLabel, optionValue, maybeOptionSearchFilter);
			case 'DatalistOption':
				var optionDisplay = option.a;
				return A2($author$project$Option$DatalistOption, optionDisplay, optionValue);
			default:
				var optionDisplay = option.a;
				var optionLabel = option.b;
				return A2($author$project$Option$EmptyOption, optionDisplay, optionLabel);
		}
	});
var $author$project$OptionsUtilities$updateDatalistOptionWithValueBySelectedValueIndexPendingValidation = F3(
	function (optionValue, selectedIndex, options) {
		return A2(
			$elm$core$List$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					selectedIndex) ? A2(
					$author$project$Option$setOptionDisplay,
					$author$project$OptionDisplay$OptionSelectedPendingValidation(selectedIndex),
					A2($author$project$Option$setOptionValue, optionValue, option)) : option;
			},
			options);
	});
var $author$project$OptionsUtilities$updateDatalistOptionsWithPendingValidation = F3(
	function (optionValue, selectedValueIndex, options) {
		return A2(
			$elm$core$List$any,
			$author$project$Option$hasSelectedItemIndex(selectedValueIndex),
			options) ? A3($author$project$OptionsUtilities$updateDatalistOptionWithValueBySelectedValueIndexPendingValidation, optionValue, selectedValueIndex, options) : A2(
			$elm$core$List$cons,
			A2($author$project$Option$newSelectedDatalistOptionPendingValidation, optionValue, selectedValueIndex),
			options);
	});
var $author$project$Option$newSelectedDatalistOption = F2(
	function (optionValue, selectedIndex) {
		return A2(
			$author$project$Option$DatalistOption,
			$author$project$OptionDisplay$selected(selectedIndex),
			optionValue);
	});
var $author$project$OptionDisplay$setErrors = F2(
	function (validationErrorMessages, optionDisplay) {
		switch (optionDisplay.$) {
			case 'OptionShown':
				return optionDisplay;
			case 'OptionHidden':
				return optionDisplay;
			case 'OptionSelected':
				var selectedIndex = optionDisplay.a;
				return ($elm$core$List$length(validationErrorMessages) > 0) ? A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, validationErrorMessages) : optionDisplay;
			case 'OptionSelectedPendingValidation':
				var selectedIndex = optionDisplay.a;
				return ($elm$core$List$length(validationErrorMessages) > 0) ? A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, validationErrorMessages) : optionDisplay;
			case 'OptionSelectedAndInvalid':
				var selectedIndex = optionDisplay.a;
				return A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, validationErrorMessages);
			case 'OptionSelectedHighlighted':
				return optionDisplay;
			case 'OptionHighlighted':
				return optionDisplay;
			case 'OptionDisabled':
				return optionDisplay;
			default:
				return optionDisplay;
		}
	});
var $author$project$Option$setOptionValueErrors = F2(
	function (validationFailures, option) {
		var newOptionDisplay = A2(
			$author$project$OptionDisplay$setErrors,
			validationFailures,
			$author$project$Option$getOptionDisplay(option));
		return A2($author$project$Option$setOptionDisplay, newOptionDisplay, option);
	});
var $author$project$OptionsUtilities$updateDatalistOptionWithValueBySelectedValueIndex = F4(
	function (errors, optionValue, selectedIndex, options) {
		return $elm$core$List$isEmpty(errors) ? A2(
			$elm$core$List$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					selectedIndex) ? A2(
					$author$project$Option$setOptionDisplay,
					A2($author$project$OptionDisplay$OptionSelected, selectedIndex, $author$project$OptionDisplay$MatureOption),
					A2($author$project$Option$setOptionValue, optionValue, option)) : option;
			},
			options) : A2(
			$elm$core$List$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					selectedIndex) ? A2(
					$author$project$Option$setOptionValueErrors,
					errors,
					A2($author$project$Option$setOptionValue, optionValue, option)) : option;
			},
			options);
	});
var $author$project$OptionsUtilities$updateDatalistOptionsWithValue = F3(
	function (optionValue, selectedValueIndex, options) {
		return A2(
			$elm$core$List$any,
			$author$project$Option$hasSelectedItemIndex(selectedValueIndex),
			options) ? A4($author$project$OptionsUtilities$updateDatalistOptionWithValueBySelectedValueIndex, _List_Nil, optionValue, selectedValueIndex, options) : A2(
			$elm$core$List$cons,
			A2($author$project$Option$newSelectedDatalistOption, optionValue, selectedValueIndex),
			options);
	});
var $author$project$OptionDisplay$selectedAndInvalid = F2(
	function (index, validationFailureMessages) {
		return A2($author$project$OptionDisplay$OptionSelectedAndInvalid, index, validationFailureMessages);
	});
var $author$project$Option$newSelectedDatalistOptionWithErrors = F3(
	function (errors, optionValue, selectedIndex) {
		return A2(
			$author$project$Option$DatalistOption,
			A2($author$project$OptionDisplay$selectedAndInvalid, selectedIndex, errors),
			optionValue);
	});
var $author$project$OptionsUtilities$updateDatalistOptionsWithValueAndErrors = F4(
	function (errors, optionValue, selectedValueIndex, options) {
		return A2(
			$elm$core$List$any,
			$author$project$Option$hasSelectedItemIndex(selectedValueIndex),
			options) ? A4($author$project$OptionsUtilities$updateDatalistOptionWithValueBySelectedValueIndex, errors, optionValue, selectedValueIndex, options) : A2(
			$elm$core$List$cons,
			A3($author$project$Option$newSelectedDatalistOptionWithErrors, errors, optionValue, selectedValueIndex),
			options);
	});
var $author$project$MuchSelect$updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves = F4(
	function (rightSlot, selectionMode, options, model) {
		return _Utils_update(
			model,
			{
				rightSlot: A4(
					$author$project$RightSlot$updateRightSlot,
					rightSlot,
					$author$project$SelectionMode$getOutputStyle(selectionMode),
					$author$project$SelectionMode$getSelectionMode(selectionMode),
					$author$project$OptionsUtilities$selectedOptions(options))
			});
	});
var $author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves = function (model) {
	return A4($author$project$MuchSelect$updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves, model.rightSlot, model.selectionConfig, model.options, model);
};
var $author$project$Option$setOptionSearchFilter = F2(
	function (maybeOptionSearchFilter, option) {
		switch (option.$) {
			case 'Option':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				var optionValue = option.c;
				var optionDescription = option.d;
				var optionGroup = option.e;
				return A6($author$project$Option$Option, optionDisplay, optionLabel, optionValue, optionDescription, optionGroup, maybeOptionSearchFilter);
			case 'CustomOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				var optionValue = option.c;
				return A4($author$project$Option$CustomOption, optionDisplay, optionLabel, optionValue, maybeOptionSearchFilter);
			case 'EmptyOption':
				var optionDisplay = option.a;
				var optionLabel = option.b;
				return A2($author$project$Option$EmptyOption, optionDisplay, optionLabel);
			default:
				return option;
		}
	});
var $author$project$OptionsUtilities$updateOptionsWithNewSearchResults = F2(
	function (optionSearchFilterWithValues, options) {
		var findNewSearchFilterResult = F2(
			function (optionValue, results) {
				return A2(
					$elm_community$list_extra$List$Extra$find,
					function (result) {
						return _Utils_eq(result.value, optionValue);
					},
					results);
			});
		return A2(
			$elm$core$List$map,
			function (option) {
				var _v0 = A2(
					findNewSearchFilterResult,
					$author$project$Option$getOptionValue(option),
					optionSearchFilterWithValues);
				if (_v0.$ === 'Just') {
					var result = _v0.a;
					return A2($author$project$Option$setOptionSearchFilter, result.maybeSearchFilter, option);
				} else {
					return A2($author$project$Option$setOptionSearchFilter, $elm$core$Maybe$Nothing, option);
				}
			},
			options);
	});
var $author$project$RightSlot$updateRightSlotLoading = F4(
	function (current, selectionConfig, selectedOptions, isLoading_) {
		if (isLoading_) {
			return $author$project$RightSlot$ShowLoadingIndicator;
		} else {
			var _v0 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (_v0.$ === 'SingleSelect') {
				var _v1 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
				if (_v1.$ === 'CustomHtml') {
					switch (current.$) {
						case 'ShowNothing':
							return $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition);
						case 'ShowLoadingIndicator':
							return $elm$core$List$isEmpty(selectedOptions) ? $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition) : $author$project$RightSlot$ShowClearButton;
						case 'ShowDropdownIndicator':
							var focusTransition = current.a;
							return $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
						case 'ShowClearButton':
							return $author$project$RightSlot$ShowClearButton;
						case 'ShowAddButton':
							return $elm$core$List$isEmpty(selectedOptions) ? $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition) : $author$project$RightSlot$ShowClearButton;
						default:
							return $elm$core$List$isEmpty(selectedOptions) ? $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition) : $author$project$RightSlot$ShowClearButton;
					}
				} else {
					switch (current.$) {
						case 'ShowNothing':
							return $author$project$RightSlot$ShowNothing;
						case 'ShowLoadingIndicator':
							return $author$project$RightSlot$ShowNothing;
						case 'ShowDropdownIndicator':
							return $author$project$RightSlot$ShowNothing;
						case 'ShowClearButton':
							return $author$project$RightSlot$ShowNothing;
						case 'ShowAddButton':
							return $author$project$RightSlot$ShowAddButton;
						default:
							return $author$project$RightSlot$ShowAddAndRemoveButtons;
					}
				}
			} else {
				var _v4 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
				if (_v4.$ === 'CustomHtml') {
					switch (current.$) {
						case 'ShowNothing':
							return $author$project$RightSlot$ShowNothing;
						case 'ShowLoadingIndicator':
							return $elm$core$List$isEmpty(selectedOptions) ? $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition) : $author$project$RightSlot$ShowClearButton;
						case 'ShowDropdownIndicator':
							var focusTransition = current.a;
							return $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
						case 'ShowClearButton':
							return $author$project$RightSlot$ShowClearButton;
						case 'ShowAddButton':
							return $elm$core$List$isEmpty(selectedOptions) ? $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition) : $author$project$RightSlot$ShowClearButton;
						default:
							return $elm$core$List$isEmpty(selectedOptions) ? $author$project$RightSlot$ShowDropdownIndicator($author$project$RightSlot$NotInFocusTransition) : $author$project$RightSlot$ShowClearButton;
					}
				} else {
					var showRemoveButtons = $elm$core$List$length(selectedOptions) > 1;
					var showAddButtons = A2(
						$elm$core$List$any,
						function (option) {
							return !$author$project$OptionValue$isEmpty(
								$author$project$Option$getOptionValue(option));
						},
						selectedOptions);
					var addAndRemoveButtonState = (showAddButtons && (!showRemoveButtons)) ? $author$project$RightSlot$ShowAddButton : ((showAddButtons && showRemoveButtons) ? $author$project$RightSlot$ShowAddAndRemoveButtons : $author$project$RightSlot$ShowNothing);
					switch (current.$) {
						case 'ShowNothing':
							return addAndRemoveButtonState;
						case 'ShowLoadingIndicator':
							return addAndRemoveButtonState;
						case 'ShowDropdownIndicator':
							return addAndRemoveButtonState;
						case 'ShowClearButton':
							return addAndRemoveButtonState;
						case 'ShowAddButton':
							return addAndRemoveButtonState;
						default:
							return addAndRemoveButtonState;
					}
				}
			}
		}
	});
var $author$project$RightSlot$updateRightSlotTransitioning = F2(
	function (focusTransition, rightSlot) {
		if (rightSlot.$ === 'ShowDropdownIndicator') {
			return $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
		} else {
			return rightSlot;
		}
	});
var $author$project$Option$equal = F2(
	function (optionA, optionB) {
		return _Utils_eq(optionA, optionB);
	});
var $author$project$OptionsUtilities$equal = F2(
	function (optionsA, optionsB) {
		return _Utils_eq(
			$elm$core$List$length(optionsA),
			$elm$core$List$length(optionsB)) ? A2(
			$elm$core$List$all,
			$elm$core$Basics$identity,
			A3(
				$elm$core$List$map2,
				F2(
					function (optionA, optionB) {
						return A2($author$project$Option$equal, optionA, optionB);
					}),
				optionsA,
				optionsB)) : false;
	});
var $author$project$OptionsUtilities$updatedDatalistSelectedOptions = F2(
	function (selectedValues, options) {
		var optionsForTheDatasetHints = $author$project$OptionsUtilities$removeEmptyOptions(
			A2(
				$elm_community$list_extra$List$Extra$uniqueBy,
				$author$project$Option$getOptionValue,
				A2(
					$elm$core$List$map,
					$author$project$Option$deselectOption,
					A2(
						$elm$core$List$filter,
						A2($elm$core$Basics$composeR, $author$project$Option$isOptionSelected, $elm$core$Basics$not),
						options))));
		var oldSelectedOptions = $author$project$OptionsUtilities$selectedOptions(options);
		var oldSelectedOptionsCleanedUp = $author$project$OptionsUtilities$cleanupEmptySelectedOptions(oldSelectedOptions);
		var newSelectedOptions = A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, selectedValue) {
					return A2($author$project$Option$newSelectedDatalistOption, selectedValue, i);
				}),
			selectedValues);
		var selectedOptions_ = A2($author$project$OptionsUtilities$equal, newSelectedOptions, oldSelectedOptionsCleanedUp) ? oldSelectedOptions : newSelectedOptions;
		return _Utils_ap(selectedOptions_, optionsForTheDatasetHints);
	});
var $author$project$MuchSelect$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
			case 'BringInputInFocus':
				var _v1 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
				if (_v1.$ === 'CustomHtml') {
					return $author$project$RightSlot$isRightSlotTransitioning(model.rightSlot) ? _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect) : ($author$project$SelectionMode$isFocused(model.selectionConfig) ? _Utils_Tuple2(model, $author$project$MuchSelect$FocusInput) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								rightSlot: A2($author$project$RightSlot$updateRightSlotTransitioning, $author$project$RightSlot$InFocusTransition, model.rightSlot),
								selectionConfig: A2($author$project$SelectionMode$setIsFocused, true, model.selectionConfig)
							}),
						$author$project$MuchSelect$FocusInput));
				} else {
					return _Utils_Tuple2(model, $author$project$MuchSelect$FocusInput);
				}
			case 'BringInputOutOfFocus':
				return $author$project$RightSlot$isRightSlotTransitioning(model.rightSlot) ? _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect) : ($author$project$SelectionMode$isFocused(model.selectionConfig) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							rightSlot: A2($author$project$RightSlot$updateRightSlotTransitioning, $author$project$RightSlot$InFocusTransition, model.rightSlot),
							selectionConfig: A2($author$project$SelectionMode$setIsFocused, false, model.selectionConfig)
						}),
					$author$project$MuchSelect$BlurInput) : _Utils_Tuple2(model, $author$project$MuchSelect$BlurInput));
			case 'InputBlur':
				var _v2 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
				if (_v2.$ === 'CustomHtml') {
					var optionsWithoutUnselectedCustomOptions = $author$project$OptionsUtilities$unhighlightSelectedOptions(
						$author$project$OptionsUtilities$removeUnselectedCustomOptions(model.options));
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									options: optionsWithoutUnselectedCustomOptions,
									rightSlot: A2($author$project$RightSlot$updateRightSlotTransitioning, $author$project$RightSlot$NotInFocusTransition, model.rightSlot),
									searchString: $author$project$SearchString$reset,
									searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce),
									selectionConfig: A2(
										$author$project$SelectionMode$setIsFocused,
										false,
										A2($author$project$SelectionMode$setShowDropdown, false, model.selectionConfig))
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$InputHasBeenBlurred,
									$author$project$MuchSelect$SearchStringTouched(model.searchStringDebounceLength)
								])));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectionConfig: A2($author$project$SelectionMode$setIsFocused, false, model.selectionConfig)
							}),
						$author$project$MuchSelect$InputHasBeenBlurred);
				}
			case 'InputFocus':
				var _v3 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
				if (_v3.$ === 'CustomHtml') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								rightSlot: A2($author$project$RightSlot$updateRightSlotTransitioning, $author$project$RightSlot$NotInFocusTransition, model.rightSlot),
								selectionConfig: A2(
									$author$project$SelectionMode$setIsFocused,
									true,
									A2($author$project$SelectionMode$setShowDropdown, true, model.selectionConfig))
							}),
						$author$project$MuchSelect$InputHasBeenFocused);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectionConfig: A2($author$project$SelectionMode$setIsFocused, true, model.selectionConfig)
							}),
						$author$project$MuchSelect$InputHasBeenFocused);
				}
			case 'DropdownMouseOverOption':
				var optionValue = msg.a;
				var updatedOptions = A2($author$project$OptionsUtilities$highlightOptionInListByValue, optionValue, model.options);
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves(
						_Utils_update(
							model,
							{options: updatedOptions})),
					$author$project$MuchSelect$NoEffect);
			case 'DropdownMouseOutOption':
				var optionValue = msg.a;
				var updatedOptions = A2($author$project$OptionsUtilities$removeHighlightOptionInList, optionValue, model.options);
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves(
						_Utils_update(
							model,
							{options: updatedOptions})),
					$author$project$MuchSelect$NoEffect);
			case 'DropdownMouseDownOption':
				var optionValue = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							options: A2($author$project$OptionsUtilities$activateOptionInListByOptionValue, optionValue, model.options)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'DropdownMouseUpOption':
				var optionValue = msg.a;
				var _v4 = $author$project$SelectionMode$getSelectionMode(model.selectionConfig);
				if (_v4.$ === 'SingleSelect') {
					var updatedOptions = A2($author$project$OptionsUtilities$selectSingleOptionInList, optionValue, model.options);
					var maybeNewlySelectedOption = A2($author$project$OptionsUtilities$findOptionByOptionValue, optionValue, updatedOptions);
					if (maybeNewlySelectedOption.$ === 'Just') {
						var newlySelectedOption = maybeNewlySelectedOption.a;
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{options: updatedOptions, searchString: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
										$author$project$MuchSelect$BlurInput
									])));
					} else {
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unable to select option'));
					}
				} else {
					var visibleOptions = A2($author$project$MuchSelect$figureOutWhichOptionsToShowInTheDropdown, model.selectionConfig, model.options);
					var moveHighlightedOptionDownIfThereAreOptions = F3(
						function (selectionConfig, allOptions, visibleOptions_) {
							return ($elm$core$List$length(visibleOptions_) > 1) ? A3($author$project$OptionsUtilities$moveHighlightedOptionDown, selectionConfig, allOptions, visibleOptions_) : allOptions;
						});
					var updatedOptions = A2(
						$author$project$OptionsUtilities$selectOptionInListByOptionValue,
						optionValue,
						A3(moveHighlightedOptionDownIfThereAreOptions, model.selectionConfig, model.options, visibleOptions));
					var maybeNewlySelectedOption = A2($author$project$OptionsUtilities$findOptionByOptionValue, optionValue, updatedOptions);
					if (maybeNewlySelectedOption.$ === 'Just') {
						var newlySelectedOption = maybeNewlySelectedOption.a;
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{options: updatedOptions, searchString: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
										$author$project$MuchSelect$FocusInput,
										$author$project$MuchSelect$SearchStringTouched(model.searchStringDebounceLength)
									])));
					} else {
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unable to select option'));
					}
				}
			case 'UpdateSearchString':
				var searchString = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							searchString: $author$project$SearchString$update(searchString),
							searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce),
							searchStringNonce: model.searchStringNonce + 1
						}),
					$author$project$MuchSelect$batch(
						_List_fromArray(
							[
								A2($author$project$MuchSelect$InputHasBeenKeyUp, searchString, $author$project$TransformAndValidate$InputValidationIsNotHappening),
								$author$project$MuchSelect$SearchStringTouched(model.searchStringDebounceLength)
							])));
			case 'SearchStringSteady':
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(model),
					$author$project$MuchSelect$SearchOptionsWithWebWorker(
						A4(
							$author$project$OptionSearcher$encodeSearchParams,
							model.searchString,
							$author$project$SelectionMode$getSearchStringMinimumLength(model.selectionConfig),
							model.searchStringNonce,
							$author$project$SearchString$isCleared(model.searchString))));
			case 'UpdateOptionValueValue':
				var selectedValueIndex = msg.a;
				var valueString = msg.b;
				var _v7 = A3(
					$author$project$TransformAndValidate$transformAndValidateFirstPass,
					$author$project$SelectionMode$getTransformAndValidate(model.selectionConfig),
					valueString,
					selectedValueIndex);
				switch (_v7.$) {
					case 'ValidationPass':
						var updatedOptions = A3(
							$author$project$OptionsUtilities$updateDatalistOptionsWithValue,
							$author$project$OptionValue$stringToOptionValue(valueString),
							selectedValueIndex,
							model.options);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									options: updatedOptions,
									rightSlot: A4(
										$author$project$RightSlot$updateRightSlot,
										model.rightSlot,
										$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										$author$project$OptionsUtilities$selectedOptions(updatedOptions))
								}),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
											$author$project$OptionsUtilities$selectedOptions(updatedOptions))),
										A2($author$project$MuchSelect$InputHasBeenKeyUp, valueString, $author$project$TransformAndValidate$InputHasBeenValidated)
									])));
					case 'ValidationFailed':
						var validationErrorMessages = _v7.c;
						var updatedOptions = A4(
							$author$project$OptionsUtilities$updateDatalistOptionsWithValueAndErrors,
							validationErrorMessages,
							$author$project$OptionValue$stringToOptionValue(valueString),
							selectedValueIndex,
							model.options);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									options: updatedOptions,
									rightSlot: A4(
										$author$project$RightSlot$updateRightSlot,
										model.rightSlot,
										$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										$author$project$OptionsUtilities$selectedOptions(updatedOptions))
								}),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
											$author$project$OptionsUtilities$selectedOptions(updatedOptions))),
										A2($author$project$MuchSelect$InputHasBeenKeyUp, valueString, $author$project$TransformAndValidate$InputHasFailedValidation)
									])));
					default:
						var updatedOptions = A3(
							$author$project$OptionsUtilities$updateDatalistOptionsWithPendingValidation,
							$author$project$OptionValue$stringToOptionValue(valueString),
							selectedValueIndex,
							model.options);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									options: updatedOptions,
									rightSlot: A4(
										$author$project$RightSlot$updateRightSlot,
										model.rightSlot,
										$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										$author$project$OptionsUtilities$selectedOptions(updatedOptions))
								}),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
											$author$project$OptionsUtilities$selectedOptions(updatedOptions))),
										A2($author$project$MuchSelect$InputHasBeenKeyUp, valueString, $author$project$TransformAndValidate$InputHasValidationPending)
									])));
				}
			case 'TextInputOnInput':
				var inputString = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							options: A3(
								$author$project$OptionSearcher$updateOrAddCustomOption,
								$author$project$SearchString$update(inputString),
								model.selectionConfig,
								model.options),
							searchString: $author$project$SearchString$update(inputString)
						}),
					A2($author$project$MuchSelect$InputHasBeenKeyUp, inputString, $author$project$TransformAndValidate$InputValidationIsNotHappening));
			case 'ValueChanged':
				var valuesJson = msg.a;
				var valuesResult = function () {
					var _v10 = $author$project$SelectionMode$getSelectionMode(model.selectionConfig);
					if (_v10.$ === 'SingleSelect') {
						return A2($elm$json$Json$Decode$decodeValue, $author$project$Ports$valueDecoder, valuesJson);
					} else {
						return A2($elm$json$Json$Decode$decodeValue, $author$project$Ports$valuesDecoder, valuesJson);
					}
				}();
				if (valuesResult.$ === 'Ok') {
					var values = valuesResult.a;
					var _v9 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
					if (_v9.$ === 'CustomHtml') {
						var newOptions = A2($author$project$OptionsUtilities$selectOptionsInOptionsListByString, values, model.options);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{options: newOptions})),
							A4(
								$author$project$MuchSelect$makeEffectsWhenValuesChanges,
								$author$project$SelectionMode$getEventMode(model.selectionConfig),
								$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
								model.selectedValueEncoding,
								$author$project$OptionsUtilities$selectedOptions(newOptions)));
					} else {
						var newOptions = A2(
							$author$project$OptionsUtilities$updatedDatalistSelectedOptions,
							A2($elm$core$List$map, $author$project$OptionValue$stringToOptionValue, values),
							model.options);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{options: newOptions})),
							A4(
								$author$project$MuchSelect$makeEffectsWhenValuesChanges,
								$author$project$SelectionMode$getEventMode(model.selectionConfig),
								$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
								model.selectedValueEncoding,
								$author$project$OptionsUtilities$selectedOptions(newOptions)));
					}
				} else {
					var error = valuesResult.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'OptionsReplaced':
				var newOptionsJson = msg.a;
				var _v11 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$Option$optionsDecoder,
						$author$project$OptionDisplay$NewOption,
						$author$project$SelectionMode$getOutputStyle(model.selectionConfig)),
					newOptionsJson);
				if (_v11.$ === 'Ok') {
					var newOptions = _v11.a;
					var _v12 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
					if (_v12.$ === 'CustomHtml') {
						var newOptionWithOldSelectedOption = A3($author$project$OptionsUtilities$replaceOptions, model.selectionConfig, model.options, newOptions);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										options: A4(
											$author$project$OptionsUtilities$updateAge,
											$author$project$SelectionMode$CustomHtml,
											model.searchString,
											$author$project$SelectionMode$getSearchStringMinimumLength(model.selectionConfig),
											newOptionWithOldSelectedOption),
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlot,
											model.rightSlot,
											$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
											$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
											$author$project$OptionsUtilities$selectedOptions(newOptionWithOldSelectedOption)),
										searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$OptionsUpdated(true),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString)
									])));
					} else {
						var newOptionWithOldSelectedOption = A4(
							$author$project$OptionsUtilities$updateAge,
							$author$project$SelectionMode$Datalist,
							model.searchString,
							$author$project$SelectionMode$getSearchStringMinimumLength(model.selectionConfig),
							$author$project$OptionsUtilities$organizeNewDatalistOptions(
								A3($author$project$OptionsUtilities$replaceOptions, model.selectionConfig, model.options, newOptions)));
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										options: newOptionWithOldSelectedOption,
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlot,
											model.rightSlot,
											$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
											$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
											$author$project$OptionsUtilities$selectedOptions(newOptionWithOldSelectedOption)),
										searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$OptionsUpdated(true),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString)
									])));
					}
				} else {
					var error = _v11.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'AddOptions':
				var optionsJson = msg.a;
				var _v13 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$Option$optionsDecoder,
						$author$project$OptionDisplay$NewOption,
						$author$project$SelectionMode$getOutputStyle(model.selectionConfig)),
					optionsJson);
				if (_v13.$ === 'Ok') {
					var newOptions = _v13.a;
					var updatedOptions = A4(
						$author$project$OptionsUtilities$updateAge,
						$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
						model.searchString,
						$author$project$SelectionMode$getSearchStringMinimumLength(model.selectionConfig),
						A2($author$project$OptionsUtilities$addAdditionalOptionsToOptionList, model.options, newOptions));
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									options: updatedOptions,
									searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce),
									searchStringDebounceLength: $author$project$MuchSelect$getDebouceDelayForSearch(
										$elm$core$List$length(updatedOptions))
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$OptionsUpdated(false),
									A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString)
								])));
				} else {
					var error = _v13.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'RemoveOptions':
				var optionsJson = msg.a;
				var _v14 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$Option$optionsDecoder,
						$author$project$OptionDisplay$MatureOption,
						$author$project$SelectionMode$getOutputStyle(model.selectionConfig)),
					optionsJson);
				if (_v14.$ === 'Ok') {
					var optionsToRemove = _v14.a;
					var updatedOptions = A2($author$project$OptionsUtilities$removeOptionsFromOptionList, model.options, optionsToRemove);
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									options: updatedOptions,
									searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce),
									searchStringDebounceLength: $author$project$MuchSelect$getDebouceDelayForSearch(
										$elm$core$List$length(updatedOptions))
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$OptionsUpdated(true),
									A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString)
								])));
				} else {
					var error = _v14.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'SelectOption':
				var optionJson = msg.a;
				var _v15 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$Option$decoder,
						$author$project$OptionDisplay$MatureOption,
						$author$project$SelectionMode$getOutputStyle(model.selectionConfig)),
					optionJson);
				if (_v15.$ === 'Ok') {
					var option = _v15.a;
					var optionValue = $author$project$Option$getOptionValue(option);
					var updatedOptions = function () {
						var _v16 = $author$project$SelectionMode$getSelectionMode(model.selectionConfig);
						if (_v16.$ === 'MultiSelect') {
							return A2($author$project$OptionsUtilities$selectOptionInListByOptionValue, optionValue, model.options);
						} else {
							return A2($author$project$OptionsUtilities$selectSingleOptionInList, optionValue, model.options);
						}
					}();
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									options: updatedOptions,
									searchStringBounce: $grotsev$elm_debouncer$Bounce$push(model.searchStringBounce)
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									A5(
									$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
									option,
									$author$project$SelectionMode$getEventMode(model.selectionConfig),
									$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
									model.selectedValueEncoding,
									$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
									A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString),
									$author$project$MuchSelect$SearchStringTouched(model.searchStringDebounceLength)
								])));
				} else {
					var error = _v15.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'DeselectOptionInternal':
				var optionToDeselect = msg.a;
				return A2($author$project$MuchSelect$deselectOption, model, optionToDeselect);
			case 'DeselectOption':
				var optionJson = msg.a;
				var _v17 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$Option$decoder,
						$author$project$OptionDisplay$MatureOption,
						$author$project$SelectionMode$getOutputStyle(model.selectionConfig)),
					optionJson);
				if (_v17.$ === 'Ok') {
					var option = _v17.a;
					return A2($author$project$MuchSelect$deselectOption, model, option);
				} else {
					var error = _v17.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'SelectedValueEncodingChanged':
				var selectedValueEncodingString = msg.a;
				var _v18 = $author$project$SelectedValueEncoding$fromString(selectedValueEncodingString);
				if (_v18.$ === 'Ok') {
					var selectedValueEncoding = _v18.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{selectedValueEncoding: selectedValueEncoding}),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v18.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(error));
				}
			case 'OptionSortingChanged':
				var sortingString = msg.a;
				var _v19 = $author$project$OptionSorting$stringToOptionSort(sortingString);
				if (_v19.$ === 'Ok') {
					var optionSorting = _v19.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{optionSort: optionSorting}),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v19.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(error));
				}
			case 'PlaceholderAttributeChanged':
				var newPlaceholder = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectionConfig: A2($author$project$SelectionMode$setPlaceholder, newPlaceholder, model.selectionConfig)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'LoadingAttributeChanged':
				var bool = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							rightSlot: A4(
								$author$project$RightSlot$updateRightSlotLoading,
								model.rightSlot,
								model.selectionConfig,
								$author$project$OptionsUtilities$selectedOptions(model.options),
								bool)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'MaxDropdownItemsChanged':
				var stringValue = msg.a;
				var _v20 = $author$project$OutputStyle$stringToMaxDropdownItems(stringValue);
				if (_v20.$ === 'Ok') {
					var maxDropdownItems = _v20.a;
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setMaxDropdownItems, maxDropdownItems, model.selectionConfig)
								})),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v20.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(error));
				}
			case 'ShowDropdownFooterChanged':
				var bool = msg.a;
				var newDropdownStyle = bool ? $author$project$OutputStyle$ShowFooter : $author$project$OutputStyle$NoFooter;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectionConfig: A2($author$project$SelectionMode$setDropdownStyle, newDropdownStyle, model.selectionConfig)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'AllowCustomOptionsChanged':
				var _v21 = msg.a;
				var canAddCustomOptions = _v21.a;
				var customOptionHint = _v21.b;
				var maybeCustomOptionHint = function () {
					switch (customOptionHint) {
						case '':
							return $elm$core$Maybe$Nothing;
						case 'true':
							return $elm$core$Maybe$Nothing;
						case 'false':
							return $elm$core$Maybe$Nothing;
						default:
							return $elm$core$Maybe$Just(customOptionHint);
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectionConfig: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, canAddCustomOptions, maybeCustomOptionHint, model.selectionConfig)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'DisabledAttributeChanged':
				var bool = msg.a;
				var newSelectionConfig = A2($author$project$SelectionMode$setIsDisabled, bool, model.selectionConfig);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							rightSlot: A4(
								$author$project$RightSlot$updateRightSlot,
								model.rightSlot,
								$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
								$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
								$author$project$OptionsUtilities$selectedOptions(model.options)),
							selectionConfig: newSelectionConfig
						}),
					$author$project$MuchSelect$NoEffect);
			case 'SelectedItemStaysInPlaceChanged':
				var selectedItemStaysInPlace = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectionConfig: A2($author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool, selectedItemStaysInPlace, model.selectionConfig)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'OutputStyleChanged':
				var newOutputStyleString = msg.a;
				var _v23 = $author$project$SelectionMode$stringToOutputStyle(newOutputStyleString);
				if (_v23.$ === 'Ok') {
					var outputStyle = _v23.a;
					var newSelectionConfig = A2($author$project$SelectionMode$setOutputStyle, outputStyle, model.selectionConfig);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								rightSlot: A4(
									$author$project$RightSlot$updateRightSlot,
									model.rightSlot,
									$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
									$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
									$author$project$OptionsUtilities$selectedOptions(model.options)),
								selectionConfig: newSelectionConfig
							}),
						$author$project$MuchSelect$Batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$FetchOptionsFromDom,
									$author$project$MuchSelect$ChangeTheLightDom(
									A2($author$project$LightDomChange$AddUpdateAttribute, 'output-style', newOutputStyleString))
								])));
				} else {
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage('Invalid output style ' + newOutputStyleString));
				}
			case 'MultiSelectSingleItemRemovalAttributeChanged':
				var shouldEnableMultiSelectSingleItemRemoval = msg.a;
				var multiSelectSingleItemRemoval = shouldEnableMultiSelectSingleItemRemoval ? $author$project$OutputStyle$EnableSingleItemRemoval : $author$project$OutputStyle$DisableSingleItemRemoval;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectionConfig: A2($author$project$SelectionMode$setSingleItemRemoval, multiSelectSingleItemRemoval, model.selectionConfig)
						}),
					$author$project$MuchSelect$batch(
						_List_fromArray(
							[$author$project$MuchSelect$ReportReady, $author$project$MuchSelect$NoEffect])));
			case 'MultiSelectAttributeChanged':
				var isInMultiSelectMode = msg.a;
				var updatedOptions = isInMultiSelectMode ? model.options : $author$project$OptionsUtilities$deselectAllButTheFirstSelectedOptionInList(model.options);
				var cmd = isInMultiSelectMode ? $author$project$MuchSelect$NoEffect : A4(
					$author$project$MuchSelect$makeEffectsWhenValuesChanges,
					$author$project$SelectionMode$getEventMode(model.selectionConfig),
					$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
					model.selectedValueEncoding,
					$author$project$OptionsUtilities$selectedOptions(updatedOptions));
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{
								options: updatedOptions,
								selectionConfig: A2($author$project$SelectionMode$setMultiSelectModeWithBool, isInMultiSelectMode, model.selectionConfig)
							})),
					$author$project$MuchSelect$batch(
						_List_fromArray(
							[
								$author$project$MuchSelect$ReportReady,
								A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString),
								cmd
							])));
			case 'SearchStringMinimumLengthAttributeChanged':
				var searchStringMinimumLength = msg.a;
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{
								selectionConfig: A2(
									$author$project$SelectionMode$setSearchStringMinimumLength,
									$author$project$OutputStyle$FixedSearchStringMinimumLength(
										$author$project$PositiveInt$new(searchStringMinimumLength)),
									model.selectionConfig)
							})),
					$author$project$MuchSelect$NoEffect);
			case 'SelectHighlightedOption':
				var updatedOptions = A2($author$project$OptionsUtilities$selectHighlightedOption, model.selectionConfig, model.options);
				var maybeHighlightedOption = $author$project$OptionsUtilities$findHighlightedOption(model.options);
				var maybeNewlySelectedOption = A2(
					$elm$core$Maybe$andThen,
					function (highlightedOption) {
						return A2(
							$author$project$OptionsUtilities$findOptionByOptionValue,
							$author$project$Option$getOptionValue(highlightedOption),
							updatedOptions);
					},
					maybeHighlightedOption);
				if (maybeNewlySelectedOption.$ === 'Just') {
					var newlySelectedOption = maybeNewlySelectedOption.a;
					var _v25 = $author$project$SelectionMode$getSelectionMode(model.selectionConfig);
					if (_v25.$ === 'SingleSelect') {
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{options: updatedOptions, searchString: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString),
										$author$project$MuchSelect$BlurInput
									])));
					} else {
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{options: updatedOptions, searchString: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString),
										$author$project$MuchSelect$FocusInput
									])));
					}
				} else {
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage('Unable select highlighted option'));
				}
			case 'DeleteInputForSingleSelect':
				var _v26 = model.selectionConfig;
				if (_v26.$ === 'SingleSelectConfig') {
					return $author$project$OptionsUtilities$hasSelectedOption(model.options) ? $author$project$MuchSelect$clearAllSelectedOption(model) : _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				} else {
					return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				}
			case 'EscapeKeyInInputFilter':
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{searchString: $author$project$SearchString$reset})),
					$author$project$MuchSelect$BlurInput);
			case 'MoveHighlightedOptionUp':
				var updatedOptions = A3(
					$author$project$OptionsUtilities$moveHighlightedOptionUp,
					model.selectionConfig,
					model.options,
					A2($author$project$MuchSelect$figureOutWhichOptionsToShowInTheDropdown, model.selectionConfig, model.options));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{options: updatedOptions}),
					$author$project$MuchSelect$ScrollDownToElement('something'));
			case 'MoveHighlightedOptionDown':
				var updatedOptions = A3(
					$author$project$OptionsUtilities$moveHighlightedOptionDown,
					model.selectionConfig,
					model.options,
					A2($author$project$MuchSelect$figureOutWhichOptionsToShowInTheDropdown, model.selectionConfig, model.options));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{options: updatedOptions}),
					$author$project$MuchSelect$ScrollDownToElement('something'));
			case 'ValueCasingWidthUpdate':
				var dims = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							valueCasing: A2($author$project$MuchSelect$ValueCasing, dims.width, dims.height)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'ClearAllSelectedOptions':
				return $author$project$MuchSelect$clearAllSelectedOption(model);
			case 'ToggleSelectedValueHighlight':
				var optionValue = msg.a;
				var updatedOptions = A2($author$project$OptionsUtilities$toggleSelectedHighlightByOptionValue, model.options, optionValue);
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{options: updatedOptions})),
					$author$project$MuchSelect$NoEffect);
			case 'DeleteKeydownForMultiSelect':
				if ($author$project$SearchString$length(model.searchString) > 0) {
					return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				} else {
					var updatedOptions = $author$project$OptionsUtilities$hasSelectedHighlightedOptions(model.options) ? $author$project$OptionsUtilities$deselectAllSelectedHighlightedOptions(model.options) : $author$project$OptionsUtilities$deselectLastSelectedOption(model.options);
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{options: updatedOptions})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									A2(
									$author$project$MuchSelect$ReportValueChanged,
									$author$project$Ports$optionsEncoder(
										$author$project$OptionsUtilities$selectedOptions(updatedOptions)),
									$author$project$SelectionMode$getSelectionMode(model.selectionConfig)),
									$author$project$MuchSelect$FocusInput
								])));
				}
			case 'AddMultiSelectValue':
				var indexWhereToAdd = msg.a;
				var updatedOptions = A2($author$project$OptionsUtilities$addNewEmptyOptionAtIndex, indexWhereToAdd + 1, model.options);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							focusedIndex: indexWhereToAdd + 1,
							options: updatedOptions,
							rightSlot: A4(
								$author$project$RightSlot$updateRightSlot,
								model.rightSlot,
								$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
								$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
								$author$project$OptionsUtilities$selectedOptions(updatedOptions))
						}),
					A4(
						$author$project$MuchSelect$makeEffectsWhenValuesChanges,
						$author$project$SelectionMode$getEventMode(model.selectionConfig),
						$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
						model.selectedValueEncoding,
						$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
							$author$project$OptionsUtilities$selectedOptions(updatedOptions))));
			case 'RemoveMultiSelectValue':
				var indexWhereToDelete = msg.a;
				var updatedOptions = A2($author$project$OptionsUtilities$removeOptionFromOptionListBySelectedIndex, indexWhereToDelete, model.options);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							options: updatedOptions,
							rightSlot: A4(
								$author$project$RightSlot$updateRightSlot,
								model.rightSlot,
								$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
								$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
								$author$project$OptionsUtilities$selectedOptions(updatedOptions))
						}),
					A4(
						$author$project$MuchSelect$makeEffectsWhenValuesChanges,
						$author$project$SelectionMode$getEventMode(model.selectionConfig),
						$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
						model.selectedValueEncoding,
						$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
							$author$project$OptionsUtilities$selectedOptions(updatedOptions))));
			case 'RequestAllOptions':
				return _Utils_Tuple2(
					model,
					$author$project$MuchSelect$ReportAllOptions(
						A2($elm$json$Json$Encode$list, $author$project$Option$encode, model.options)));
			case 'UpdateSearchResultsForOptions':
				var updatedSearchResultsJsonValue = msg.a;
				var _v27 = A2($elm$json$Json$Decode$decodeValue, $author$project$Option$decodeSearchResults, updatedSearchResultsJsonValue);
				if (_v27.$ === 'Ok') {
					var searchResults = _v27.a;
					if (_Utils_eq(searchResults.searchNonce, model.searchStringNonce)) {
						var updatedOptions = A2(
							$author$project$OptionsUtilities$setAge,
							$author$project$OptionDisplay$MatureOption,
							A2($author$project$OptionsUtilities$updateOptionsWithNewSearchResults, searchResults.optionSearchFilters, model.options));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									options: searchResults.isClearingSearch ? updatedOptions : A2(
										$author$project$OptionsUtilities$adjustHighlightedOptionAfterSearch,
										updatedOptions,
										$author$project$OptionsUtilities$notSelectedOptions(
											A2($author$project$MuchSelect$figureOutWhichOptionsToShowInTheDropdown, model.selectionConfig, updatedOptions)))
								}),
							$author$project$MuchSelect$NoEffect);
					} else {
						return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
					}
				} else {
					var error = _v27.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'CustomValidationResponse':
				var customValidationResultJson = msg.a;
				var _v28 = A2($elm$json$Json$Decode$decodeValue, $author$project$TransformAndValidate$customValidationResultDecoder, customValidationResultJson);
				if (_v28.$ === 'Ok') {
					var customValidationResult = _v28.a;
					var _v29 = A2(
						$author$project$TransformAndValidate$transformAndValidateSecondPass,
						$author$project$SelectionMode$getTransformAndValidate(model.selectionConfig),
						customValidationResult);
					switch (_v29.$) {
						case 'ValidationPass':
							var valueString = _v29.a;
							var selectedValueIndex = _v29.b;
							var updatedOptions = A3(
								$author$project$OptionsUtilities$updateDatalistOptionsWithValue,
								$author$project$OptionValue$stringToOptionValue(valueString),
								selectedValueIndex,
								model.options);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										options: updatedOptions,
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlot,
											model.rightSlot,
											$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
											$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
											$author$project$OptionsUtilities$selectedOptions(updatedOptions))
									}),
								A4(
									$author$project$MuchSelect$makeEffectsWhenValuesChanges,
									$author$project$SelectionMode$getEventMode(model.selectionConfig),
									$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
									model.selectedValueEncoding,
									$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
										$author$project$OptionsUtilities$selectedOptions(updatedOptions))));
						case 'ValidationFailed':
							var valueString = _v29.a;
							var selectedValueIndex = _v29.b;
							var validationFailureMessages = _v29.c;
							var updatedOptions = A4(
								$author$project$OptionsUtilities$updateDatalistOptionsWithValueAndErrors,
								validationFailureMessages,
								$author$project$OptionValue$stringToOptionValue(valueString),
								selectedValueIndex,
								model.options);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										options: updatedOptions,
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlot,
											model.rightSlot,
											$author$project$SelectionMode$getOutputStyle(model.selectionConfig),
											$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
											$author$project$OptionsUtilities$selectedOptions(updatedOptions))
									}),
								A4(
									$author$project$MuchSelect$makeEffectsWhenValuesChanges,
									$author$project$SelectionMode$getEventMode(model.selectionConfig),
									$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
									model.selectedValueEncoding,
									$author$project$OptionsUtilities$cleanupEmptySelectedOptions(
										$author$project$OptionsUtilities$selectedOptions(updatedOptions))));
						default:
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage('We should not end up with a validation pending state on a second pass.'));
					}
				} else {
					var error = _v28.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'UpdateTransformationAndValidation':
				var transformationAndValidationJson = msg.a;
				var _v30 = A2($elm$json$Json$Decode$decodeValue, $author$project$TransformAndValidate$decoder, transformationAndValidationJson);
				if (_v30.$ === 'Ok') {
					var newTransformationAndValidation = _v30.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectionConfig: A2($author$project$SelectionMode$setTransformAndValidate, newTransformationAndValidation, model.selectionConfig)
							}),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v30.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 'AttributeChanged':
				var _v31 = msg.a;
				var attributeName = _v31.a;
				var newAttributeValue = _v31.b;
				switch (attributeName) {
					case 'allow-custom-options':
						switch (newAttributeValue) {
							case '':
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											selectionConfig: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, true, $elm$core$Maybe$Nothing, model.selectionConfig)
										}),
									$author$project$MuchSelect$NoEffect);
							case 'false':
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											selectionConfig: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, false, $elm$core$Maybe$Nothing, model.selectionConfig)
										}),
									$author$project$MuchSelect$NoEffect);
							case 'true':
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											selectionConfig: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, true, $elm$core$Maybe$Nothing, model.selectionConfig)
										}),
									$author$project$MuchSelect$NoEffect);
							default:
								var customOptionHint = newAttributeValue;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											selectionConfig: A3(
												$author$project$SelectionMode$setAllowCustomOptionsWithBool,
												true,
												$elm$core$Maybe$Just(customOptionHint),
												model.selectionConfig)
										}),
									$author$project$MuchSelect$NoEffect);
						}
					case 'disabled':
						var newSelectionConfig = A2($author$project$SelectionMode$setIsDisabled, true, model.selectionConfig);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									rightSlot: A4(
										$author$project$RightSlot$updateRightSlot,
										model.rightSlot,
										$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
										$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
										$author$project$OptionsUtilities$selectedOptions(model.options)),
									selectionConfig: newSelectionConfig
								}),
							$author$project$MuchSelect$NoEffect);
					case 'events-only':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setEventsOnly, true, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'loading':
						if (newAttributeValue === 'false') {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlotLoading,
											model.rightSlot,
											model.selectionConfig,
											$author$project$OptionsUtilities$selectedOptions(model.options),
											false)
									}),
								$author$project$MuchSelect$NoEffect);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlotLoading,
											model.rightSlot,
											model.selectionConfig,
											$author$project$OptionsUtilities$selectedOptions(model.options),
											true)
									}),
								$author$project$MuchSelect$NoEffect);
						}
					case 'max-dropdown-items':
						var _v35 = $author$project$OutputStyle$stringToMaxDropdownItems(newAttributeValue);
						if (_v35.$ === 'Ok') {
							var maxDropdownItems = _v35.a;
							return _Utils_Tuple2(
								$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
									_Utils_update(
										model,
										{
											selectionConfig: A2($author$project$SelectionMode$setMaxDropdownItems, maxDropdownItems, model.selectionConfig)
										})),
								$author$project$MuchSelect$NoEffect);
						} else {
							var err = _v35.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(err));
						}
					case 'multi-select':
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										selectionConfig: A2($author$project$SelectionMode$setMultiSelectModeWithBool, true, model.selectionConfig)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$ReportReady,
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString)
									])));
					case 'multi-select-single-item-removal':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setSingleItemRemoval, $author$project$OutputStyle$EnableSingleItemRemoval, model.selectionConfig)
								}),
							$author$project$MuchSelect$ReportReady);
					case 'option-sorting':
						var _v36 = $author$project$OptionSorting$stringToOptionSort(newAttributeValue);
						if (_v36.$ === 'Ok') {
							var optionSorting = _v36.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{optionSort: optionSorting}),
								$author$project$MuchSelect$NoEffect);
						} else {
							var error = _v36.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(error));
						}
					case 'output-style':
						var _v37 = $author$project$SelectionMode$stringToOutputStyle(newAttributeValue);
						if (_v37.$ === 'Ok') {
							var outputStyle = _v37.a;
							var newSelectionConfig = A2($author$project$SelectionMode$setOutputStyle, outputStyle, model.selectionConfig);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										rightSlot: A4(
											$author$project$RightSlot$updateRightSlot,
											model.rightSlot,
											$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
											$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
											model.options),
										selectionConfig: newSelectionConfig
									}),
								$author$project$MuchSelect$FetchOptionsFromDom);
						} else {
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage('Invalid output style: ' + newAttributeValue));
						}
					case 'placeholder':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2(
										$author$project$SelectionMode$setPlaceholder,
										_Utils_Tuple2(true, newAttributeValue),
										model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'search-string-minimum-length':
						if (newAttributeValue === '') {
							return _Utils_Tuple2(
								$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
									_Utils_update(
										model,
										{
											selectionConfig: A2($author$project$SelectionMode$setSearchStringMinimumLength, $author$project$OutputStyle$NoMinimumToSearchStringLength, model.selectionConfig)
										})),
								$author$project$MuchSelect$NoEffect);
						} else {
							var _v39 = $author$project$PositiveInt$fromString(newAttributeValue);
							if (_v39.$ === 'Just') {
								var minimumLength = _v39.a;
								return _Utils_Tuple2(
									$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
										_Utils_update(
											model,
											{
												selectionConfig: A2(
													$author$project$SelectionMode$setSearchStringMinimumLength,
													$author$project$OutputStyle$FixedSearchStringMinimumLength(minimumLength),
													model.selectionConfig)
											})),
									$author$project$MuchSelect$NoEffect);
							} else {
								return _Utils_Tuple2(
									model,
									$author$project$MuchSelect$ReportErrorMessage('Search string minimum length needs to be a positive integer'));
							}
						}
					case 'selected-option-goes-to-top':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool, false, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'selected-value':
						var _v40 = A2($author$project$SelectedValueEncoding$stringToValueStrings, model.selectedValueEncoding, newAttributeValue);
						if (_v40.$ === 'Ok') {
							var selectedValueStrings = _v40.a;
							if (A2($author$project$OptionsUtilities$selectedOptionValuesAreEqual, selectedValueStrings, model.options)) {
								return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
							} else {
								if (!selectedValueStrings.b) {
									return $author$project$MuchSelect$clearAllSelectedOption(model);
								} else {
									if (!selectedValueStrings.b.b) {
										var selectedValueString = selectedValueStrings.a;
										if (selectedValueString === '') {
											return $author$project$MuchSelect$clearAllSelectedOption(model);
										} else {
											var newOptions = A2(
												$author$project$OptionsUtilities$addAndSelectOptionsInOptionsListByString,
												selectedValueStrings,
												A2($elm$core$List$map, $author$project$Option$deselectOption, model.options));
											return _Utils_Tuple2(
												$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
													_Utils_update(
														model,
														{options: newOptions})),
												A4(
													$author$project$MuchSelect$makeEffectsWhenValuesChanges,
													$author$project$SelectionMode$getEventMode(model.selectionConfig),
													$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
													model.selectedValueEncoding,
													$author$project$OptionsUtilities$selectedOptions(newOptions)));
										}
									} else {
										var newOptions = A2(
											$author$project$OptionsUtilities$addAndSelectOptionsInOptionsListByString,
											selectedValueStrings,
											A2($elm$core$List$map, $author$project$Option$deselectOption, model.options));
										return _Utils_Tuple2(
											$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
												_Utils_update(
													model,
													{options: newOptions})),
											A4(
												$author$project$MuchSelect$makeEffectsWhenValuesChanges,
												$author$project$SelectionMode$getEventMode(model.selectionConfig),
												$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
												model.selectedValueEncoding,
												$author$project$OptionsUtilities$selectedOptions(newOptions)));
									}
								}
							}
						} else {
							var error = _v40.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(error));
						}
					case 'selected-value-encoding':
						var _v43 = $author$project$SelectedValueEncoding$fromString(newAttributeValue);
						if (_v43.$ === 'Ok') {
							var selectedValueEncoding = _v43.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{selectedValueEncoding: selectedValueEncoding}),
								$author$project$MuchSelect$NoEffect);
						} else {
							var error = _v43.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(error));
						}
					case 'show-dropdown-footer':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setDropdownStyle, $author$project$OutputStyle$ShowFooter, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					default:
						var unknownAttribute = attributeName;
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unknown attribute: ' + unknownAttribute));
				}
			case 'AttributeRemoved':
				var attributeName = msg.a;
				switch (attributeName) {
					case 'allow-custom-options':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, false, $elm$core$Maybe$Nothing, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'disabled':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setIsDisabled, false, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'events-only':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setEventsOnly, false, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'loading':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									rightSlot: A4(
										$author$project$RightSlot$updateRightSlotLoading,
										model.rightSlot,
										model.selectionConfig,
										$author$project$OptionsUtilities$selectedOptions(model.options),
										false)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'max-dropdown-items':
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										selectionConfig: A2(
											$author$project$SelectionMode$setMaxDropdownItems,
											$author$project$OutputStyle$FixedMaxDropdownItems($author$project$OutputStyle$defaultMaxDropdownItemsNum),
											model.selectionConfig)
									})),
							$author$project$MuchSelect$NoEffect);
					case 'multi-select':
						var updatedOptions = $author$project$OptionsUtilities$deselectAllButTheFirstSelectedOptionInList(model.options);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										options: updatedOptions,
										selectionConfig: A2($author$project$SelectionMode$setMultiSelectModeWithBool, false, model.selectionConfig)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$ReportReady,
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.searchStringDebounceLength, model.searchString),
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.selectionConfig),
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										$author$project$OptionsUtilities$selectedOptions(updatedOptions))
									])));
					case 'multi-select-single-item-removal':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setSingleItemRemoval, $author$project$OutputStyle$DisableSingleItemRemoval, model.selectionConfig)
								}),
							$author$project$MuchSelect$ReportReady);
					case 'option-sorting':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{optionSort: $author$project$OptionSorting$NoSorting}),
							$author$project$MuchSelect$NoEffect);
					case 'output-style':
						var newSelectionConfig = A2($author$project$SelectionMode$setOutputStyle, $author$project$SelectionMode$CustomHtml, model.selectionConfig);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									rightSlot: A4(
										$author$project$RightSlot$updateRightSlot,
										model.rightSlot,
										$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
										$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
										$author$project$OptionsUtilities$selectedOptions(model.options)),
									selectionConfig: newSelectionConfig
								}),
							$author$project$MuchSelect$FetchOptionsFromDom);
					case 'placeholder':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2(
										$author$project$SelectionMode$setPlaceholder,
										_Utils_Tuple2(false, ''),
										model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'search-string-minimum-length':
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										selectionConfig: A2($author$project$SelectionMode$setSearchStringMinimumLength, $author$project$OutputStyle$NoMinimumToSearchStringLength, model.selectionConfig)
									})),
							$author$project$MuchSelect$NoEffect);
					case 'selected-option-goes-to-top':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool, true, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'selected-value':
						return $author$project$MuchSelect$clearAllSelectedOption(model);
					case 'selected-value-encoding':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{selectedValueEncoding: $author$project$SelectedValueEncoding$defaultSelectedValueEncoding}),
							$author$project$MuchSelect$NoEffect);
					case 'show-dropdown-footer':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									selectionConfig: A2($author$project$SelectionMode$setDropdownStyle, $author$project$OutputStyle$NoFooter, model.selectionConfig)
								}),
							$author$project$MuchSelect$NoEffect);
					default:
						var unknownAttribute = attributeName;
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unknown attribute: ' + unknownAttribute));
				}
			case 'CustomOptionHintChanged':
				var customOptionHint = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectionConfig: A2($author$project$SelectionMode$setCustomOptionHint, customOptionHint, model.selectionConfig)
						}),
					$author$project$MuchSelect$NoEffect);
			case 'RequestConfigState':
				return _Utils_Tuple2(
					model,
					$author$project$MuchSelect$DumpConfigState(
						A4($author$project$ConfigDump$encodeConfig, model.selectionConfig, model.optionSort, model.selectedValueEncoding, model.rightSlot)));
			default:
				return _Utils_Tuple2(
					model,
					$author$project$MuchSelect$DumpSelectedValues(
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'value',
									A2(
										$author$project$SelectedValueEncoding$selectedValue,
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.options)),
									_Utils_Tuple2(
									'rawValue',
									A3(
										$author$project$SelectedValueEncoding$rawSelectedValue,
										$author$project$SelectionMode$getSelectionMode(model.selectionConfig),
										model.selectedValueEncoding,
										model.options))
								]))));
		}
	});
var $author$project$MuchSelect$updateWrapper = F2(
	function (msg, model) {
		return A2(
			$elm$core$Tuple$mapSecond,
			$author$project$MuchSelect$perform,
			A2($author$project$MuchSelect$update, msg, model));
	});
var $author$project$MuchSelect$NoOp = {$: 'NoOp'};
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$html$Html$optgroup = _VirtualDom_node('optgroup');
var $elm$html$Html$option = _VirtualDom_node('option');
var $author$project$MuchSelect$optionToDatalistOption = function (option) {
	return A2(
		$elm$html$Html$option,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$value(
				$author$project$Option$getOptionValueAsString(option))
			]),
		_List_Nil);
};
var $author$project$MuchSelect$dataListOptionGroupToHtml = function (_v0) {
	var optionGroup = _v0.a;
	var options = _v0.b;
	var _v1 = $author$project$Option$optionGroupToString(optionGroup);
	if (_v1 === '') {
		return A2($elm$core$List$map, $author$project$MuchSelect$optionToDatalistOption, options);
	} else {
		var optionGroupAsString = _v1;
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$optgroup,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$attribute, 'label', optionGroupAsString)
					]),
				A2($elm$core$List$map, $author$project$MuchSelect$optionToDatalistOption, options))
			]);
	}
};
var $elm$html$Html$datalist = _VirtualDom_node('datalist');
var $elm_community$list_extra$List$Extra$groupWhile = F2(
	function (isSameGroup, items) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					if (!acc.b) {
						return _List_fromArray(
							[
								_Utils_Tuple2(x, _List_Nil)
							]);
					} else {
						var _v1 = acc.a;
						var y = _v1.a;
						var restOfGroup = _v1.b;
						var groups = acc.b;
						return A2(isSameGroup, x, y) ? A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								x,
								A2($elm$core$List$cons, y, restOfGroup)),
							groups) : A2(
							$elm$core$List$cons,
							_Utils_Tuple2(x, _List_Nil),
							acc);
					}
				}),
			_List_Nil,
			items);
	});
var $author$project$OptionsUtilities$groupOptionsInOrder = function (options) {
	var helper = F2(
		function (optionA, optionB) {
			return _Utils_eq(
				$author$project$Option$getOptionGroup(optionA),
				$author$project$Option$getOptionGroup(optionB));
		});
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var first = _v0.a;
			var rest = _v0.b;
			return _Utils_Tuple2(
				$author$project$Option$getOptionGroup(first),
				A2($elm$core$List$cons, first, rest));
		},
		A2($elm_community$list_extra$List$Extra$groupWhile, helper, options));
};
var $author$project$MuchSelect$datalist = function (options) {
	return A2(
		$elm$html$Html$datalist,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('datalist-options')
			]),
		A2(
			$elm$core$List$concatMap,
			$author$project$MuchSelect$dataListOptionGroupToHtml,
			$author$project$OptionsUtilities$groupOptionsInOrder(
				$author$project$OptionsUtilities$unselectedOptions(options))));
};
var $author$project$MuchSelect$DropdownMouseDownOption = function (a) {
	return {$: 'DropdownMouseDownOption', a: a};
};
var $author$project$MuchSelect$DropdownMouseOutOption = function (a) {
	return {$: 'DropdownMouseOutOption', a: a};
};
var $author$project$MuchSelect$DropdownMouseOverOption = function (a) {
	return {$: 'DropdownMouseOverOption', a: a};
};
var $author$project$MuchSelect$DropdownMouseUpOption = function (a) {
	return {$: 'DropdownMouseUpOption', a: a};
};
var $author$project$OptionSearcher$doesSearchStringFindNothing = F3(
	function (searchString, searchStringMinimumLength, options) {
		if (searchStringMinimumLength.$ === 'NoMinimumToSearchStringLength') {
			return true;
		} else {
			var num = searchStringMinimumLength.a;
			return (_Utils_cmp(
				$author$project$SearchString$length(searchString),
				$author$project$PositiveInt$toInt(num)) < 1) ? false : A2(
				$elm$core$List$all,
				function (option) {
					var _v1 = $author$project$Option$getMaybeOptionSearchFilter(option);
					if (_v1.$ === 'Just') {
						var optionSearchFilter = _v1.a;
						return optionSearchFilter.bestScore > 1000;
					} else {
						return false;
					}
				},
				options);
		}
	});
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var $elm$html$Html$Lazy$lazy2 = $elm$virtual_dom$VirtualDom$lazy2;
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $author$project$MuchSelect$mouseDownPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: true, stopPropagation: false}));
};
var $author$project$MuchSelect$mouseUpPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mouseup',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: true, stopPropagation: false}));
};
var $author$project$MuchSelect$onClickPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'click',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: true, stopPropagation: false}));
};
var $author$project$MuchSelect$onClickPreventDefaultAndStopPropagation = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'click',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: true, stopPropagation: true}));
};
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Option$optionDescriptionToBool = function (optionDescription) {
	if (optionDescription.$ === 'OptionDescription') {
		return true;
	} else {
		return false;
	}
};
var $author$project$OptionPresentor$tokensToHtml = function (list) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var highlighted = _v0.a;
			var string = _v0.b;
			return highlighted ? A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('highlight')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(string)
					])) : $elm$html$Html$text(string);
		},
		list);
};
var $author$project$MuchSelect$optionToDropdownOption = F3(
	function (eventHandlers, selectionConfig_, option_) {
		return A3(
			$elm$html$Html$Lazy$lazy2,
			F2(
				function (selectionConfig, option) {
					var valueDataAttribute = A2(
						$elm$html$Html$Attributes$attribute,
						'data-value',
						$author$project$Option$getOptionValueAsString(option));
					var labelHtml = function () {
						var _v4 = $author$project$Option$getMaybeOptionSearchFilter(option);
						if (_v4.$ === 'Just') {
							var optionSearchFilter = _v4.a;
							return A2(
								$elm$html$Html$span,
								_List_Nil,
								$author$project$OptionPresentor$tokensToHtml(optionSearchFilter.labelTokens));
						} else {
							return A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$author$project$OptionLabel$optionLabelToString(
											$author$project$Option$getOptionLabel(option)))
									]));
						}
					}();
					var descriptionHtml = function () {
						if ($author$project$Option$optionDescriptionToBool(
							$author$project$Option$getOptionDescription(option))) {
							var _v3 = $author$project$Option$getMaybeOptionSearchFilter(option);
							if (_v3.$ === 'Just') {
								var optionSearchFilter = _v3.a;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('description'),
											A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option-description')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_Nil,
											$author$project$OptionPresentor$tokensToHtml(optionSearchFilter.descriptionTokens))
										]));
							} else {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('description'),
											A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option-description')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(
													$author$project$Option$optionDescriptionToString(
														$author$project$Option$getOptionDescription(option)))
												]))
										]));
							}
						} else {
							return $elm$html$Html$text('');
						}
					}();
					var _v0 = $author$project$Option$getOptionDisplay(option);
					switch (_v0.$) {
						case 'OptionShown':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Events$onMouseEnter(
										eventHandlers.mouseOverMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$elm$html$Html$Events$onMouseLeave(
										eventHandlers.mouseOutMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$mouseDownPreventDefault(
										eventHandlers.mouseDownMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$mouseUpPreventDefault(
										eventHandlers.mouseUpMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$onClickPreventDefault(eventHandlers.noOpMsgConstructor),
										A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option'),
										$elm$html$Html$Attributes$class('option'),
										valueDataAttribute
									]),
								_List_fromArray(
									[labelHtml, descriptionHtml]));
						case 'OptionHidden':
							return $elm$html$Html$text('');
						case 'OptionSelected':
							var _v1 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
							if (_v1.$ === 'SingleSelect') {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Events$onMouseEnter(
											eventHandlers.mouseOverMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											$elm$html$Html$Events$onMouseLeave(
											eventHandlers.mouseOutMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											$author$project$MuchSelect$mouseDownPreventDefault(
											eventHandlers.mouseDownMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											$author$project$MuchSelect$mouseUpPreventDefault(
											eventHandlers.mouseUpMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected'),
											$elm$html$Html$Attributes$class('selected'),
											$elm$html$Html$Attributes$class('option'),
											valueDataAttribute
										]),
									_List_fromArray(
										[labelHtml, descriptionHtml]));
							} else {
								return $elm$html$Html$text('');
							}
						case 'OptionSelectedPendingValidation':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled'),
										$elm$html$Html$Attributes$class('disabled'),
										$elm$html$Html$Attributes$class('option'),
										valueDataAttribute
									]),
								_List_fromArray(
									[labelHtml, descriptionHtml]));
						case 'OptionSelectedAndInvalid':
							return $elm$html$Html$text('');
						case 'OptionSelectedHighlighted':
							var _v2 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
							if (_v2.$ === 'SingleSelect') {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Events$onMouseEnter(
											eventHandlers.mouseOverMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											$elm$html$Html$Events$onMouseLeave(
											eventHandlers.mouseOutMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											$author$project$MuchSelect$mouseDownPreventDefault(
											eventHandlers.mouseDownMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											$author$project$MuchSelect$mouseUpPreventDefault(
											eventHandlers.mouseUpMsgConstructor(
												$author$project$Option$getOptionValue(option))),
											A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected highlighted'),
											$elm$html$Html$Attributes$class('selected'),
											$elm$html$Html$Attributes$class('highlighted'),
											$elm$html$Html$Attributes$class('option'),
											valueDataAttribute
										]),
									_List_fromArray(
										[labelHtml, descriptionHtml]));
							} else {
								return $elm$html$Html$text('');
							}
						case 'OptionHighlighted':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Events$onMouseEnter(
										eventHandlers.mouseOverMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$elm$html$Html$Events$onMouseLeave(
										eventHandlers.mouseOutMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$mouseDownPreventDefault(
										eventHandlers.mouseDownMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$mouseUpPreventDefault(
										eventHandlers.mouseUpMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option highlighted'),
										$elm$html$Html$Attributes$class('highlighted'),
										$elm$html$Html$Attributes$class('option'),
										valueDataAttribute
									]),
								_List_fromArray(
									[labelHtml, descriptionHtml]));
						case 'OptionDisabled':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled'),
										$elm$html$Html$Attributes$class('disabled'),
										$elm$html$Html$Attributes$class('option'),
										valueDataAttribute
									]),
								_List_fromArray(
									[labelHtml, descriptionHtml]));
						default:
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Events$onMouseEnter(
										eventHandlers.mouseOverMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$elm$html$Html$Events$onMouseLeave(
										eventHandlers.mouseOutMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$mouseDownPreventDefault(
										eventHandlers.mouseDownMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$mouseUpPreventDefault(
										eventHandlers.mouseUpMsgConstructor(
											$author$project$Option$getOptionValue(option))),
										$author$project$MuchSelect$onClickPreventDefaultAndStopPropagation(eventHandlers.noOpMsgConstructor),
										A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option active'),
										$elm$html$Html$Attributes$class('option'),
										$elm$html$Html$Attributes$class('active'),
										$elm$html$Html$Attributes$class('highlighted'),
										valueDataAttribute
									]),
								_List_fromArray(
									[labelHtml, descriptionHtml]));
					}
				}),
			selectionConfig_,
			option_);
	});
var $author$project$MuchSelect$optionGroupToHtml = F3(
	function (dropdownItemEventListeners, selectionMode, _v0) {
		var optionGroup = _v0.a;
		var options = _v0.b;
		var optionGroupHtml = function () {
			var _v1 = A2(
				$elm$core$Maybe$andThen,
				$author$project$Option$getMaybeOptionSearchFilter,
				$elm$core$List$head(options));
			if (_v1.$ === 'Just') {
				var optionSearchFilter = _v1.a;
				var _v2 = $author$project$Option$optionGroupToString(optionGroup);
				if (_v2 === '') {
					return $elm$html$Html$text('');
				} else {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('optgroup'),
								A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-optgroup')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('optgroup-header')
									]),
								$author$project$OptionPresentor$tokensToHtml(optionSearchFilter.groupTokens))
							]));
				}
			} else {
				var _v3 = $author$project$Option$optionGroupToString(optionGroup);
				if (_v3 === '') {
					return $elm$html$Html$text('');
				} else {
					var optionGroupAsString = _v3;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('optgroup'),
								A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-optgroup')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('optgroup-header')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(optionGroupAsString)
									]))
							]));
				}
			}
		}();
		return A2(
			$elm$core$List$cons,
			optionGroupHtml,
			A2(
				$elm$core$List$map,
				A2($author$project$MuchSelect$optionToDropdownOption, dropdownItemEventListeners, selectionMode),
				options));
	});
var $author$project$MuchSelect$optionsToDropdownOptions = F3(
	function (eventHandlers, selectionMode, options) {
		return A2(
			$elm$core$List$concatMap,
			A2($author$project$MuchSelect$optionGroupToHtml, eventHandlers, selectionMode),
			$author$project$OptionsUtilities$groupOptionsInOrder(options));
	});
var $author$project$OutputStyle$NotManagedByMe = {$: 'NotManagedByMe'};
var $author$project$SelectionMode$getDropdownState = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var singleSelectOutputStyle = selectionConfig.a;
		if (singleSelectOutputStyle.$ === 'SingleSelectCustomHtml') {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.dropdownState;
		} else {
			return $author$project$OutputStyle$NotManagedByMe;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (multiSelectOutputStyle.$ === 'MultiSelectCustomHtml') {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.dropdownState;
		} else {
			return $author$project$OutputStyle$NotManagedByMe;
		}
	}
};
var $author$project$SelectionMode$showDropdown = function (selectionConfig) {
	var _v0 = $author$project$SelectionMode$getDropdownState(selectionConfig);
	switch (_v0.$) {
		case 'Expanded':
			return true;
		case 'Collapsed':
			return false;
		default:
			return false;
	}
};
var $author$project$MuchSelect$dropdown = F4(
	function (selectionMode, options, searchString, _v0) {
		var valueCasingWidth = _v0.a;
		var valueCasingHeight = _v0.b;
		var optionsForTheDropdown = A2($author$project$MuchSelect$figureOutWhichOptionsToShowInTheDropdown, selectionMode, options);
		var optionsHtml = $elm$core$List$isEmpty(optionsForTheDropdown) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('option disabled')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'slot',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('no-options')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No available options')
							]))
					]))
			]) : (A3(
			$author$project$OptionSearcher$doesSearchStringFindNothing,
			searchString,
			$author$project$SelectionMode$getSearchStringMinimumLength(selectionMode),
			optionsForTheDropdown) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('option disabled')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'slot',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('no-filtered-options')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('This filter returned no results.')
							]))
					]))
			]) : A3(
			$author$project$MuchSelect$optionsToDropdownOptions,
			{mouseDownMsgConstructor: $author$project$MuchSelect$DropdownMouseDownOption, mouseOutMsgConstructor: $author$project$MuchSelect$DropdownMouseOutOption, mouseOverMsgConstructor: $author$project$MuchSelect$DropdownMouseOverOption, mouseUpMsgConstructor: $author$project$MuchSelect$DropdownMouseUpOption, noOpMsgConstructor: $author$project$MuchSelect$NoOp},
			selectionMode,
			optionsForTheDropdown));
		var dropdownFooterHtml = ($author$project$SelectionMode$showDropdownFooter(selectionMode) && (_Utils_cmp(
			$elm$core$List$length(optionsForTheDropdown),
			$elm$core$List$length(options)) < 0)) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dropdown-footer'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-footer')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'showing ' + ($elm$core$String$fromInt(
						$elm$core$List$length(optionsForTheDropdown)) + (' of ' + ($elm$core$String$fromInt(
						$elm$core$List$length(options)) + ' options'))))
				])) : $elm$html$Html$text('');
		return $author$project$SelectionMode$isDisabled(selectionMode) ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dropdown'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'showing',
							$author$project$SelectionMode$showDropdown(selectionMode)),
							_Utils_Tuple2(
							'hiding',
							!$author$project$SelectionMode$showDropdown(selectionMode))
						])),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(valueCasingHeight) + 'px'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$elm$core$String$fromFloat(valueCasingWidth) + 'px')
				]),
			_Utils_ap(
				optionsHtml,
				_List_fromArray(
					[dropdownFooterHtml])));
	});
var $elm_community$html_extra$Html$Attributes$Extra$empty = $elm$html$Html$Attributes$classList(_List_Nil);
var $author$project$SelectionMode$isSingleSelect = function (selectionMode) {
	if (selectionMode.$ === 'SingleSelectConfig') {
		return true;
	} else {
		return false;
	}
};
var $ohanhi$keyboard$Keyboard$ArrowDown = {$: 'ArrowDown'};
var $ohanhi$keyboard$Keyboard$ArrowUp = {$: 'ArrowUp'};
var $ohanhi$keyboard$Keyboard$Backspace = {$: 'Backspace'};
var $author$project$MuchSelect$BringInputInFocus = {$: 'BringInputInFocus'};
var $ohanhi$keyboard$Keyboard$Delete = {$: 'Delete'};
var $author$project$MuchSelect$DeleteKeydownForMultiSelect = {$: 'DeleteKeydownForMultiSelect'};
var $ohanhi$keyboard$Keyboard$Enter = {$: 'Enter'};
var $ohanhi$keyboard$Keyboard$Escape = {$: 'Escape'};
var $author$project$MuchSelect$EscapeKeyInInputFilter = {$: 'EscapeKeyInInputFilter'};
var $author$project$MuchSelect$InputBlur = {$: 'InputBlur'};
var $author$project$MuchSelect$InputFocus = {$: 'InputFocus'};
var $robinheghan$keyboard_events$Keyboard$Events$Keydown = {$: 'Keydown'};
var $author$project$MuchSelect$MoveHighlightedOptionDown = {$: 'MoveHighlightedOptionDown'};
var $author$project$MuchSelect$MoveHighlightedOptionUp = {$: 'MoveHighlightedOptionUp'};
var $author$project$MuchSelect$SelectHighlightedOption = {$: 'SelectHighlightedOption'};
var $author$project$MuchSelect$UpdateSearchString = function (a) {
	return {$: 'UpdateSearchString', a: a};
};
var $elm_community$html_extra$Html$Attributes$Extra$attributeIf = F2(
	function (condition, attr) {
		return condition ? attr : $elm_community$html_extra$Html$Attributes$Extra$empty;
	});
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $author$project$SelectionMode$getInteractionState = function (selectionConfig) {
	if (selectionConfig.$ === 'SingleSelectConfig') {
		var interactionState = selectionConfig.c;
		return interactionState;
	} else {
		var interactionState = selectionConfig.c;
		return interactionState;
	}
};
var $author$project$SelectionMode$getPlaceholderString = function (selectionConfig) {
	return $author$project$SelectionMode$getPlaceholder(selectionConfig).b;
};
var $author$project$OptionsUtilities$hasAnyValidationErrors = function (options) {
	return A2($elm$core$List$any, $author$project$Option$isInvalid, options);
};
var $robinheghan$keyboard_events$Keyboard$Events$eventToString = function (event) {
	switch (event.$) {
		case 'Keydown':
			return 'keydown';
		case 'Keyup':
			return 'keyup';
		default:
			return 'keypress';
	}
};
var $ohanhi$keyboard$Keyboard$Clear = {$: 'Clear'};
var $ohanhi$keyboard$Keyboard$Copy = {$: 'Copy'};
var $ohanhi$keyboard$Keyboard$CrSel = {$: 'CrSel'};
var $ohanhi$keyboard$Keyboard$Cut = {$: 'Cut'};
var $ohanhi$keyboard$Keyboard$EraseEof = {$: 'EraseEof'};
var $ohanhi$keyboard$Keyboard$ExSel = {$: 'ExSel'};
var $ohanhi$keyboard$Keyboard$Insert = {$: 'Insert'};
var $ohanhi$keyboard$Keyboard$Paste = {$: 'Paste'};
var $ohanhi$keyboard$Keyboard$Redo = {$: 'Redo'};
var $ohanhi$keyboard$Keyboard$Undo = {$: 'Undo'};
var $ohanhi$keyboard$Keyboard$editingKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Backspace':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Backspace);
		case 'Clear':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Clear);
		case 'Copy':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Copy);
		case 'CrSel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CrSel);
		case 'Cut':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Cut);
		case 'Delete':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Delete);
		case 'EraseEof':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$EraseEof);
		case 'ExSel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ExSel);
		case 'Insert':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Insert);
		case 'Paste':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Paste);
		case 'Redo':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Redo);
		case 'Undo':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Undo);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$F1 = {$: 'F1'};
var $ohanhi$keyboard$Keyboard$F10 = {$: 'F10'};
var $ohanhi$keyboard$Keyboard$F11 = {$: 'F11'};
var $ohanhi$keyboard$Keyboard$F12 = {$: 'F12'};
var $ohanhi$keyboard$Keyboard$F13 = {$: 'F13'};
var $ohanhi$keyboard$Keyboard$F14 = {$: 'F14'};
var $ohanhi$keyboard$Keyboard$F15 = {$: 'F15'};
var $ohanhi$keyboard$Keyboard$F16 = {$: 'F16'};
var $ohanhi$keyboard$Keyboard$F17 = {$: 'F17'};
var $ohanhi$keyboard$Keyboard$F18 = {$: 'F18'};
var $ohanhi$keyboard$Keyboard$F19 = {$: 'F19'};
var $ohanhi$keyboard$Keyboard$F2 = {$: 'F2'};
var $ohanhi$keyboard$Keyboard$F20 = {$: 'F20'};
var $ohanhi$keyboard$Keyboard$F3 = {$: 'F3'};
var $ohanhi$keyboard$Keyboard$F4 = {$: 'F4'};
var $ohanhi$keyboard$Keyboard$F5 = {$: 'F5'};
var $ohanhi$keyboard$Keyboard$F6 = {$: 'F6'};
var $ohanhi$keyboard$Keyboard$F7 = {$: 'F7'};
var $ohanhi$keyboard$Keyboard$F8 = {$: 'F8'};
var $ohanhi$keyboard$Keyboard$F9 = {$: 'F9'};
var $ohanhi$keyboard$Keyboard$functionKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'F1':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F1);
		case 'F2':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F2);
		case 'F3':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F3);
		case 'F4':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F4);
		case 'F5':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F5);
		case 'F6':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F6);
		case 'F7':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F7);
		case 'F8':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F8);
		case 'F9':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F9);
		case 'F10':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F10);
		case 'F11':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F11);
		case 'F12':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F12);
		case 'F13':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F13);
		case 'F14':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F14);
		case 'F15':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F15);
		case 'F16':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F16);
		case 'F17':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F17);
		case 'F18':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F18);
		case 'F19':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F19);
		case 'F20':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F20);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$ChannelDown = {$: 'ChannelDown'};
var $ohanhi$keyboard$Keyboard$ChannelUp = {$: 'ChannelUp'};
var $ohanhi$keyboard$Keyboard$MediaFastForward = {$: 'MediaFastForward'};
var $ohanhi$keyboard$Keyboard$MediaPause = {$: 'MediaPause'};
var $ohanhi$keyboard$Keyboard$MediaPlay = {$: 'MediaPlay'};
var $ohanhi$keyboard$Keyboard$MediaPlayPause = {$: 'MediaPlayPause'};
var $ohanhi$keyboard$Keyboard$MediaRecord = {$: 'MediaRecord'};
var $ohanhi$keyboard$Keyboard$MediaRewind = {$: 'MediaRewind'};
var $ohanhi$keyboard$Keyboard$MediaStop = {$: 'MediaStop'};
var $ohanhi$keyboard$Keyboard$MediaTrackNext = {$: 'MediaTrackNext'};
var $ohanhi$keyboard$Keyboard$MediaTrackPrevious = {$: 'MediaTrackPrevious'};
var $ohanhi$keyboard$Keyboard$mediaKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'ChannelDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ChannelDown);
		case 'ChannelUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ChannelUp);
		case 'MediaFastForward':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaFastForward);
		case 'MediaPause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPause);
		case 'MediaPlay':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPlay);
		case 'MediaPlayPause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPlayPause);
		case 'MediaRecord':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaRecord);
		case 'MediaRewind':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaRewind);
		case 'MediaStop':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaStop);
		case 'MediaTrackNext':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaTrackNext);
		case 'MediaTrackPrevious':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaTrackPrevious);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Alt = {$: 'Alt'};
var $ohanhi$keyboard$Keyboard$AltGraph = {$: 'AltGraph'};
var $ohanhi$keyboard$Keyboard$CapsLock = {$: 'CapsLock'};
var $ohanhi$keyboard$Keyboard$Control = {$: 'Control'};
var $ohanhi$keyboard$Keyboard$Fn = {$: 'Fn'};
var $ohanhi$keyboard$Keyboard$FnLock = {$: 'FnLock'};
var $ohanhi$keyboard$Keyboard$Hyper = {$: 'Hyper'};
var $ohanhi$keyboard$Keyboard$Meta = {$: 'Meta'};
var $ohanhi$keyboard$Keyboard$NumLock = {$: 'NumLock'};
var $ohanhi$keyboard$Keyboard$ScrollLock = {$: 'ScrollLock'};
var $ohanhi$keyboard$Keyboard$Shift = {$: 'Shift'};
var $ohanhi$keyboard$Keyboard$Super = {$: 'Super'};
var $ohanhi$keyboard$Keyboard$Symbol = {$: 'Symbol'};
var $ohanhi$keyboard$Keyboard$SymbolLock = {$: 'SymbolLock'};
var $ohanhi$keyboard$Keyboard$modifierKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Alt':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Alt);
		case 'AltGraph':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$AltGraph);
		case 'CapsLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CapsLock);
		case 'Control':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Control);
		case 'Fn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Fn);
		case 'FnLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$FnLock);
		case 'Hyper':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Hyper);
		case 'Meta':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Meta);
		case 'NumLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$NumLock);
		case 'ScrollLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ScrollLock);
		case 'Shift':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Shift);
		case 'Super':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Super);
		case 'OS':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Super);
		case 'Symbol':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Symbol);
		case 'SymbolLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$SymbolLock);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$ArrowLeft = {$: 'ArrowLeft'};
var $ohanhi$keyboard$Keyboard$ArrowRight = {$: 'ArrowRight'};
var $ohanhi$keyboard$Keyboard$End = {$: 'End'};
var $ohanhi$keyboard$Keyboard$Home = {$: 'Home'};
var $ohanhi$keyboard$Keyboard$PageDown = {$: 'PageDown'};
var $ohanhi$keyboard$Keyboard$PageUp = {$: 'PageUp'};
var $ohanhi$keyboard$Keyboard$navigationKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'ArrowDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowDown);
		case 'ArrowLeft':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'ArrowRight':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowRight);
		case 'ArrowUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowUp);
		case 'Down':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowDown);
		case 'Left':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'Right':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowRight);
		case 'Up':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowUp);
		case 'End':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$End);
		case 'Home':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Home);
		case 'PageDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$PageDown);
		case 'PageUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$PageUp);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$oneOf = F2(
	function (fns, key) {
		oneOf:
		while (true) {
			if (!fns.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var fn = fns.a;
				var rest = fns.b;
				var _v1 = fn(key);
				if (_v1.$ === 'Just') {
					var a = _v1.a;
					return $elm$core$Maybe$Just(a);
				} else {
					var $temp$fns = rest,
						$temp$key = key;
					fns = $temp$fns;
					key = $temp$key;
					continue oneOf;
				}
			}
		}
	});
var $ohanhi$keyboard$Keyboard$AppSwitch = {$: 'AppSwitch'};
var $ohanhi$keyboard$Keyboard$Call = {$: 'Call'};
var $ohanhi$keyboard$Keyboard$Camera = {$: 'Camera'};
var $ohanhi$keyboard$Keyboard$CameraFocus = {$: 'CameraFocus'};
var $ohanhi$keyboard$Keyboard$EndCall = {$: 'EndCall'};
var $ohanhi$keyboard$Keyboard$GoBack = {$: 'GoBack'};
var $ohanhi$keyboard$Keyboard$GoHome = {$: 'GoHome'};
var $ohanhi$keyboard$Keyboard$HeadsetHook = {$: 'HeadsetHook'};
var $ohanhi$keyboard$Keyboard$LastNumberRedial = {$: 'LastNumberRedial'};
var $ohanhi$keyboard$Keyboard$MannerMode = {$: 'MannerMode'};
var $ohanhi$keyboard$Keyboard$Notification = {$: 'Notification'};
var $ohanhi$keyboard$Keyboard$VoiceDial = {$: 'VoiceDial'};
var $ohanhi$keyboard$Keyboard$phoneKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'AppSwitch':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$AppSwitch);
		case 'Call':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Call);
		case 'Camera':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Camera);
		case 'CameraFocus':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CameraFocus);
		case 'EndCall':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$EndCall);
		case 'GoBack':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$GoBack);
		case 'GoHome':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$GoHome);
		case 'HeadsetHook':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$HeadsetHook);
		case 'LastNumberRedial':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$LastNumberRedial);
		case 'Notification':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Notification);
		case 'MannerMode':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MannerMode);
		case 'VoiceDial':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$VoiceDial);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Again = {$: 'Again'};
var $ohanhi$keyboard$Keyboard$Attn = {$: 'Attn'};
var $ohanhi$keyboard$Keyboard$Cancel = {$: 'Cancel'};
var $ohanhi$keyboard$Keyboard$ContextMenu = {$: 'ContextMenu'};
var $ohanhi$keyboard$Keyboard$Execute = {$: 'Execute'};
var $ohanhi$keyboard$Keyboard$Find = {$: 'Find'};
var $ohanhi$keyboard$Keyboard$Finish = {$: 'Finish'};
var $ohanhi$keyboard$Keyboard$Help = {$: 'Help'};
var $ohanhi$keyboard$Keyboard$Pause = {$: 'Pause'};
var $ohanhi$keyboard$Keyboard$Play = {$: 'Play'};
var $ohanhi$keyboard$Keyboard$Props = {$: 'Props'};
var $ohanhi$keyboard$Keyboard$Select = {$: 'Select'};
var $ohanhi$keyboard$Keyboard$ZoomIn = {$: 'ZoomIn'};
var $ohanhi$keyboard$Keyboard$ZoomOut = {$: 'ZoomOut'};
var $ohanhi$keyboard$Keyboard$uiKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Again':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Again);
		case 'Attn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Attn);
		case 'Cancel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Cancel);
		case 'ContextMenu':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ContextMenu);
		case 'Escape':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Escape);
		case 'Execute':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Execute);
		case 'Find':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Find);
		case 'Finish':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Finish);
		case 'Help':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Help);
		case 'Pause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Pause);
		case 'Play':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Play);
		case 'Props':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Props);
		case 'Select':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Select);
		case 'ZoomIn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ZoomIn);
		case 'ZoomOut':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ZoomOut);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Spacebar = {$: 'Spacebar'};
var $ohanhi$keyboard$Keyboard$Tab = {$: 'Tab'};
var $ohanhi$keyboard$Keyboard$whitespaceKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Enter':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Enter);
		case 'Tab':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Tab);
		case 'Spacebar':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Spacebar);
		case ' ':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Spacebar);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$anyKeyWith = function (charParser) {
	return $ohanhi$keyboard$Keyboard$oneOf(
		_List_fromArray(
			[$ohanhi$keyboard$Keyboard$whitespaceKey, charParser, $ohanhi$keyboard$Keyboard$modifierKey, $ohanhi$keyboard$Keyboard$navigationKey, $ohanhi$keyboard$Keyboard$editingKey, $ohanhi$keyboard$Keyboard$functionKey, $ohanhi$keyboard$Keyboard$uiKey, $ohanhi$keyboard$Keyboard$phoneKey, $ohanhi$keyboard$Keyboard$mediaKey]));
};
var $ohanhi$keyboard$Keyboard$Character = function (a) {
	return {$: 'Character', a: a};
};
var $elm$core$String$toUpper = _String_toUpper;
var $ohanhi$keyboard$Keyboard$characterKeyUpper = function (_v0) {
	var value = _v0.a;
	return ($elm$core$String$length(value) === 1) ? $elm$core$Maybe$Just(
		$ohanhi$keyboard$Keyboard$Character(
			$elm$core$String$toUpper(value))) : $elm$core$Maybe$Nothing;
};
var $ohanhi$keyboard$Keyboard$anyKeyUpper = $ohanhi$keyboard$Keyboard$anyKeyWith($ohanhi$keyboard$Keyboard$characterKeyUpper);
var $ohanhi$keyboard$Keyboard$RawKey = function (a) {
	return {$: 'RawKey', a: a};
};
var $ohanhi$keyboard$Keyboard$eventKeyDecoder = A2(
	$elm$json$Json$Decode$field,
	'key',
	A2($elm$json$Json$Decode$map, $ohanhi$keyboard$Keyboard$RawKey, $elm$json$Json$Decode$string));
var $robinheghan$keyboard_events$Keyboard$Events$messageSelector = function (decisionMap) {
	var helper = function (maybeKey) {
		if (maybeKey.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key we\'re interested in');
		} else {
			var key = maybeKey.a;
			return A2(
				$elm$core$Maybe$withDefault,
				$elm$json$Json$Decode$fail('No key we\'re interested in'),
				A2(
					$elm$core$Maybe$map,
					$elm$json$Json$Decode$succeed,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$second,
						$elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (_v1) {
									var k = _v1.a;
									return _Utils_eq(k, key);
								},
								decisionMap)))));
		}
	};
	return A2(
		$elm$json$Json$Decode$andThen,
		helper,
		A2($elm$json$Json$Decode$map, $ohanhi$keyboard$Keyboard$anyKeyUpper, $ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var $robinheghan$keyboard_events$Keyboard$Events$on = F2(
	function (event, decisionMap) {
		return A2(
			$elm$html$Html$Events$on,
			$robinheghan$keyboard_events$Keyboard$Events$eventToString(event),
			$robinheghan$keyboard_events$Keyboard$Events$messageSelector(decisionMap));
	});
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$MuchSelect$onMouseDownStopPropagation = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: false, stopPropagation: true}));
};
var $author$project$MuchSelect$onMouseUpStopPropagation = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mouseup',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: false, stopPropagation: true}));
};
var $author$project$MuchSelect$DeselectOptionInternal = function (a) {
	return {$: 'DeselectOptionInternal', a: a};
};
var $author$project$OptionLabel$getLabelString = function (optionLabel) {
	var string = optionLabel.a;
	return string;
};
var $author$project$MuchSelect$ToggleSelectedValueHighlight = function (a) {
	return {$: 'ToggleSelectedValueHighlight', a: a};
};
var $author$project$MuchSelect$valueLabelHtml = F3(
	function (interactionState, labelText, optionValue) {
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('value-label'),
					function () {
					switch (interactionState.$) {
						case 'Focused':
							return $author$project$MuchSelect$mouseUpPreventDefault(
								$author$project$MuchSelect$ToggleSelectedValueHighlight(optionValue));
						case 'Unfocused':
							return $author$project$MuchSelect$mouseUpPreventDefault(
								$author$project$MuchSelect$ToggleSelectedValueHighlight(optionValue));
						default:
							return $elm_community$html_extra$Html$Attributes$Extra$empty;
					}
				}()
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(labelText)
				]));
	});
var $author$project$MuchSelect$optionToValueHtml = F3(
	function (enableSingleItemRemoval, interactionState, option) {
		var removalHtml = function () {
			if (enableSingleItemRemoval.$ === 'EnableSingleItemRemoval') {
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$author$project$MuchSelect$mouseUpPreventDefault(
							$author$project$MuchSelect$DeselectOptionInternal(option)),
							$elm$html$Html$Attributes$class('remove-option')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						]));
			} else {
				return $elm$html$Html$text('');
			}
		}();
		var partAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'value');
		var highlightPartAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'value highlighted-value');
		switch (option.$) {
			case 'Option':
				var display = option.a;
				var optionLabel = option.b;
				var optionValue = option.c;
				switch (display.$) {
					case 'OptionShown':
						return $elm$html$Html$text('');
					case 'OptionHidden':
						return $elm$html$Html$text('');
					case 'OptionSelected':
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('value'),
									partAttr
								]),
							_List_fromArray(
								[
									A3(
									$author$project$MuchSelect$valueLabelHtml,
									interactionState,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml
								]));
					case 'OptionSelectedPendingValidation':
						return $elm$html$Html$text('');
					case 'OptionSelectedAndInvalid':
						return $elm$html$Html$text('');
					case 'OptionSelectedHighlighted':
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('value', true),
											_Utils_Tuple2('highlighted-value', true)
										])),
									highlightPartAttr
								]),
							_List_fromArray(
								[
									A3(
									$author$project$MuchSelect$valueLabelHtml,
									interactionState,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml
								]));
					case 'OptionHighlighted':
						return $elm$html$Html$text('');
					case 'OptionDisabled':
						return $elm$html$Html$text('');
					default:
						return $elm$html$Html$text('');
				}
			case 'CustomOption':
				var display = option.a;
				var optionLabel = option.b;
				var optionValue = option.c;
				switch (display.$) {
					case 'OptionShown':
						return $elm$html$Html$text('');
					case 'OptionHidden':
						return $elm$html$Html$text('');
					case 'OptionSelected':
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('value'),
									partAttr
								]),
							_List_fromArray(
								[
									A3(
									$author$project$MuchSelect$valueLabelHtml,
									interactionState,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml
								]));
					case 'OptionSelectedPendingValidation':
						return $elm$html$Html$text('');
					case 'OptionSelectedAndInvalid':
						return $elm$html$Html$text('');
					case 'OptionSelectedHighlighted':
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('value', true),
											_Utils_Tuple2('highlighted-value', true)
										])),
									highlightPartAttr
								]),
							_List_fromArray(
								[
									A3(
									$author$project$MuchSelect$valueLabelHtml,
									interactionState,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml
								]));
					case 'OptionHighlighted':
						return $elm$html$Html$text('');
					case 'OptionDisabled':
						return $elm$html$Html$text('');
					default:
						return $elm$html$Html$text('');
				}
			case 'EmptyOption':
				var display = option.a;
				var optionLabel = option.b;
				switch (display.$) {
					case 'OptionShown':
						return $elm$html$Html$text('');
					case 'OptionHidden':
						return $elm$html$Html$text('');
					case 'OptionSelected':
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('value'),
									partAttr
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$OptionLabel$getLabelString(optionLabel))
								]));
					case 'OptionSelectedPendingValidation':
						return $elm$html$Html$text('');
					case 'OptionSelectedAndInvalid':
						return $elm$html$Html$text('');
					case 'OptionSelectedHighlighted':
						return $elm$html$Html$text('');
					case 'OptionHighlighted':
						return $elm$html$Html$text('');
					case 'OptionDisabled':
						return $elm$html$Html$text('');
					default:
						return $elm$html$Html$text('');
				}
			default:
				return $elm$html$Html$text('');
		}
	});
var $author$project$MuchSelect$optionsToValuesHtml = F3(
	function (options, enableSingleItemRemoval, interactionState) {
		return A2(
			$elm$core$List$map,
			A3($elm$html$Html$Lazy$lazy3, $author$project$MuchSelect$optionToValueHtml, enableSingleItemRemoval, interactionState),
			A2(
				$elm$core$List$sortBy,
				$author$project$Option$getOptionSelectedIndex,
				$author$project$OptionsUtilities$selectedOptions(options)));
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$MuchSelect$AddMultiSelectValue = function (a) {
	return {$: 'AddMultiSelectValue', a: a};
};
var $author$project$MuchSelect$ClearAllSelectedOptions = {$: 'ClearAllSelectedOptions'};
var $author$project$MuchSelect$RemoveMultiSelectValue = function (a) {
	return {$: 'RemoveMultiSelectValue', a: a};
};
var $author$project$MuchSelect$defaultAddButton = A2(
	$elm$html$Html$button,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('+')
		]));
var $author$project$MuchSelect$addButtonSlot = function (index) {
	return A3(
		$elm$html$Html$node,
		'slot',
		_List_fromArray(
			[
				$elm$html$Html$Attributes$name(
				'add-value-button-' + $elm$core$String$fromInt(index))
			]),
		_List_fromArray(
			[$author$project$MuchSelect$defaultAddButton]));
};
var $author$project$MuchSelect$defaultLoadingIndicator = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('default-loading-indicator')
		]),
	_List_Nil);
var $author$project$MuchSelect$BringInputOutOfFocus = {$: 'BringInputOutOfFocus'};
var $author$project$MuchSelect$onMouseDownStopPropagationAndPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: true, stopPropagation: true}));
};
var $author$project$MuchSelect$onMouseUpStopPropagationAndPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mouseup',
		$elm$json$Json$Decode$succeed(
			{message: message, preventDefault: true, stopPropagation: true}));
};
var $author$project$MuchSelect$dropdownIndicator = F2(
	function (interactionState, transitioning) {
		if (interactionState.$ === 'Disabled') {
			return $elm$html$Html$text('');
		} else {
			var partAttr = function () {
				switch (interactionState.$) {
					case 'Focused':
						return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-indicator down');
					case 'Unfocused':
						return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-indicator up');
					default:
						return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-indicator');
				}
			}();
			var classes = function () {
				switch (interactionState.$) {
					case 'Focused':
						return _List_fromArray(
							[
								_Utils_Tuple2('down', true)
							]);
					case 'Unfocused':
						return _List_fromArray(
							[
								_Utils_Tuple2('up', true)
							]);
					default:
						return _List_Nil;
				}
			}();
			var action = function () {
				if (transitioning.$ === 'InFocusTransition') {
					return $author$project$MuchSelect$NoOp;
				} else {
					return _Utils_eq(interactionState, $author$project$SelectionMode$Focused) ? $author$project$MuchSelect$BringInputOutOfFocus : $author$project$MuchSelect$BringInputInFocus;
				}
			}();
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('dropdown-indicator'),
						partAttr,
						$elm$html$Html$Attributes$classList(classes),
						$author$project$MuchSelect$onMouseDownStopPropagationAndPreventDefault(action),
						$author$project$MuchSelect$onMouseUpStopPropagationAndPreventDefault($author$project$MuchSelect$NoOp)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('❯')
					]));
		}
	});
var $author$project$MuchSelect$defaultRemoveButton = A2(
	$elm$html$Html$button,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('✘')
		]));
var $author$project$MuchSelect$remoteButtonSlot = function (index) {
	return A3(
		$elm$html$Html$node,
		'slot',
		_List_fromArray(
			[
				$elm$html$Html$Attributes$name(
				'remove-value-button-' + $elm$core$String$fromInt(index))
			]),
		_List_fromArray(
			[$author$project$MuchSelect$defaultRemoveButton]));
};
var $author$project$MuchSelect$rightSlotHtml = F4(
	function (rightSlot, interactionState, isDisabled, selectedIndex) {
		switch (rightSlot.$) {
			case 'ShowNothing':
				return $elm$html$Html$text('');
			case 'ShowLoadingIndicator':
				return A3(
					$elm$html$Html$node,
					'slot',
					_List_fromArray(
						[
							$elm$html$Html$Attributes$name('loading-indicator')
						]),
					_List_fromArray(
						[$author$project$MuchSelect$defaultLoadingIndicator]));
			case 'ShowDropdownIndicator':
				var transitioning = rightSlot.a;
				return A2($author$project$MuchSelect$dropdownIndicator, interactionState, transitioning);
			case 'ShowClearButton':
				return isDisabled ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('clear-button-wrapper'),
							A2($elm$html$Html$Attributes$attribute, 'part', 'clear-button-wrapper'),
							$author$project$MuchSelect$onClickPreventDefaultAndStopPropagation($author$project$MuchSelect$ClearAllSelectedOptions)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$elm$html$Html$Attributes$name('clear-button')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('✕')
								]))
						]));
			case 'ShowAddButton':
				return isDisabled ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('add-remove-buttons')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('add-button-wrapper'),
									$elm$html$Html$Events$onClick(
									$author$project$MuchSelect$AddMultiSelectValue(selectedIndex))
								]),
							_List_fromArray(
								[
									$author$project$MuchSelect$addButtonSlot(selectedIndex)
								]))
						]));
			default:
				return isDisabled ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('add-remove-buttons')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('add-button-wrapper'),
									$elm$html$Html$Events$onClick(
									$author$project$MuchSelect$AddMultiSelectValue(selectedIndex))
								]),
							_List_fromArray(
								[
									$author$project$MuchSelect$addButtonSlot(selectedIndex)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('remove-button-wrapper'),
									$elm$html$Html$Events$onClick(
									$author$project$MuchSelect$RemoveMultiSelectValue(selectedIndex))
								]),
							_List_fromArray(
								[
									$author$project$MuchSelect$remoteButtonSlot(selectedIndex)
								]))
						]));
		}
	});
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $author$project$MuchSelect$tabIndexAttribute = function (disabled) {
	return disabled ? A2($elm$html$Html$Attributes$style, '', '') : $elm$html$Html$Attributes$tabindex(0);
};
var $author$project$MuchSelect$valueCasingClassList = F3(
	function (selectionConfig, hasOptionSelected, hasAnError) {
		var selectionModeClass = function () {
			var _v2 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (_v2.$ === 'SingleSelect') {
				return _Utils_Tuple2('single', true);
			} else {
				return _Utils_Tuple2('multi', true);
			}
		}();
		var outputStyleClass = function () {
			var _v1 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (_v1.$ === 'CustomHtml') {
				return _Utils_Tuple2('output-style-custom-html', true);
			} else {
				return _Utils_Tuple2('output-style-datalist', true);
			}
		}();
		var isFocused_ = $author$project$SelectionMode$isFocused(selectionConfig);
		var showPlaceholder = function () {
			var _v0 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (_v0.$ === 'CustomHtml') {
				return (!hasOptionSelected) && (!isFocused_);
			} else {
				return false;
			}
		}();
		return _List_fromArray(
			[
				_Utils_Tuple2('has-option-selected', hasOptionSelected),
				_Utils_Tuple2('no-option-selected', !hasOptionSelected),
				selectionModeClass,
				outputStyleClass,
				_Utils_Tuple2(
				'disabled',
				$author$project$SelectionMode$isDisabled(selectionConfig)),
				_Utils_Tuple2('focused', isFocused_),
				_Utils_Tuple2('not-focused', !isFocused_),
				_Utils_Tuple2('show-placeholder', showPlaceholder),
				_Utils_Tuple2('error', hasAnError)
			]);
	});
var $author$project$MuchSelect$valueCasingPartsAttribute = F3(
	function (selectionConfig, hasError, hasPendingValidation) {
		var selectionModeStr = function () {
			var _v2 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (_v2.$ === 'SingleSelect') {
				return 'single';
			} else {
				return 'multi';
			}
		}();
		var outputStyleStr = function () {
			var _v1 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (_v1.$ === 'CustomHtml') {
				return 'output-style-custom-html';
			} else {
				return 'output-style-datalist';
			}
		}();
		var interactionStateStr = function () {
			var _v0 = $author$project$SelectionMode$getInteractionState(selectionConfig);
			switch (_v0.$) {
				case 'Focused':
					return 'focused';
				case 'Unfocused':
					return 'unfocused';
				default:
					return 'disabled';
			}
		}();
		var hasPendingValidationStr = hasPendingValidation ? 'pending-validation' : '';
		var hasErrorStr = hasError ? 'error' : '';
		return A2(
			$elm$html$Html$Attributes$attribute,
			'part',
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['value-casing', outputStyleStr, selectionModeStr, interactionStateStr, hasErrorStr, hasPendingValidationStr])));
	});
var $author$project$MuchSelect$multiSelectViewCustomHtml = F4(
	function (selectionConfig, options, searchString, rightSlot) {
		var hasPendingValidation = $author$project$OptionsUtilities$hasAnyPendingValidation(options);
		var hasOptionSelected = $author$project$OptionsUtilities$hasSelectedOption(options);
		var showPlaceholder = (!hasOptionSelected) && (!$author$project$SelectionMode$isFocused(selectionConfig));
		var placeholderAttribute = showPlaceholder ? $elm$html$Html$Attributes$placeholder(
			$author$project$SelectionMode$getPlaceholderString(selectionConfig)) : $elm$html$Html$Attributes$classList(_List_Nil);
		var inputFilter = A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$type_('text'),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					$elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					$elm$html$Html$Events$onFocus($author$project$MuchSelect$InputFocus)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					$elm$html$Html$Events$onInput($author$project$MuchSelect$UpdateSearchString)),
					$author$project$MuchSelect$onMouseDownStopPropagation($author$project$MuchSelect$NoOp),
					$author$project$MuchSelect$onMouseUpStopPropagation($author$project$MuchSelect$NoOp),
					$elm$html$Html$Attributes$value(
					$author$project$SearchString$toString(searchString)),
					placeholderAttribute,
					$elm$html$Html$Attributes$id('input-filter'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'input-filter'),
					$elm$html$Html$Attributes$disabled(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					A2(
						$robinheghan$keyboard_events$Keyboard$Events$on,
						$robinheghan$keyboard_events$Keyboard$Events$Keydown,
						_List_fromArray(
							[
								_Utils_Tuple2($ohanhi$keyboard$Keyboard$Enter, $author$project$MuchSelect$SelectHighlightedOption),
								_Utils_Tuple2($ohanhi$keyboard$Keyboard$Escape, $author$project$MuchSelect$EscapeKeyInInputFilter),
								_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowUp, $author$project$MuchSelect$MoveHighlightedOptionUp),
								_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowDown, $author$project$MuchSelect$MoveHighlightedOptionDown)
							])))
				]),
			_List_Nil);
		var hasErrors = $author$project$OptionsUtilities$hasAnyValidationErrors(options);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasErrors, hasPendingValidation),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					$elm$html$Html$Events$onMouseDown($author$project$MuchSelect$NoOp)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					$elm$html$Html$Events$onMouseUp($author$project$MuchSelect$BringInputInFocus)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					$elm$html$Html$Events$onFocus($author$project$MuchSelect$BringInputInFocus)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isDisabled(selectionConfig),
					A2(
						$robinheghan$keyboard_events$Keyboard$Events$on,
						$robinheghan$keyboard_events$Keyboard$Events$Keydown,
						_List_fromArray(
							[
								_Utils_Tuple2($ohanhi$keyboard$Keyboard$Delete, $author$project$MuchSelect$DeleteKeydownForMultiSelect),
								_Utils_Tuple2($ohanhi$keyboard$Keyboard$Backspace, $author$project$MuchSelect$DeleteKeydownForMultiSelect)
							]))),
					$author$project$MuchSelect$tabIndexAttribute(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, false))
				]),
			_Utils_ap(
				A3(
					$author$project$MuchSelect$optionsToValuesHtml,
					options,
					$author$project$SelectionMode$getSingleItemRemoval(selectionConfig),
					$author$project$SelectionMode$getInteractionState(selectionConfig)),
				_List_fromArray(
					[
						inputFilter,
						A4(
						$author$project$MuchSelect$rightSlotHtml,
						rightSlot,
						$author$project$SelectionMode$getInteractionState(selectionConfig),
						$author$project$SelectionMode$isDisabled(selectionConfig),
						0)
					])));
	});
var $author$project$MuchSelect$UpdateOptionValueValue = F2(
	function (a, b) {
		return {$: 'UpdateOptionValueValue', a: a, b: b};
	});
var $author$project$OptionDisplay$getErrors = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 'OptionShown':
			return _List_Nil;
		case 'OptionHidden':
			return _List_Nil;
		case 'OptionSelected':
			return _List_Nil;
		case 'OptionSelectedPendingValidation':
			return _List_Nil;
		case 'OptionSelectedAndInvalid':
			var validationFailures = optionDisplay.b;
			return validationFailures;
		case 'OptionSelectedHighlighted':
			return _List_Nil;
		case 'OptionHighlighted':
			return _List_Nil;
		case 'OptionDisabled':
			return _List_Nil;
		default:
			return _List_Nil;
	}
};
var $author$project$Option$getOptionValidationErrors = function (option) {
	return $author$project$OptionDisplay$getErrors(
		$author$project$Option$getOptionDisplay(option));
};
var $author$project$SelectionMode$hasPlaceholder = function (selectionConfig) {
	return $author$project$SelectionMode$getPlaceholder(selectionConfig).a;
};
var $elm$html$Html$Attributes$list = _VirtualDom_attribute('list');
var $author$project$MuchSelect$multiSelectDatasetInputField = F4(
	function (maybeOption, selectionConfig, rightSlot, index) {
		var valueString = function () {
			if (maybeOption.$ === 'Just') {
				var option = maybeOption.a;
				return $author$project$Option$getOptionValueAsString(option);
			} else {
				return '';
			}
		}();
		var typeAttr = $elm$html$Html$Attributes$type_('text');
		var placeholderAttribute = $author$project$SelectionMode$hasPlaceholder(selectionConfig) ? $elm$html$Html$Attributes$placeholder(
			$author$project$SelectionMode$getPlaceholderString(selectionConfig)) : $elm_community$html_extra$Html$Attributes$Extra$empty;
		var makeValidationErrorMessage = function (validationFailure) {
			var validationReportLevel = validationFailure.a;
			var validationErrorMessage = validationFailure.b;
			if (validationReportLevel.$ === 'SilentError') {
				return $elm$html$Html$text('');
			} else {
				var string = validationErrorMessage.a;
				return A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(string)
						]));
			}
		};
		var isOptionInvalid = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Maybe$map, $author$project$Option$isInvalid, maybeOption));
		var idAttr = $elm$html$Html$Attributes$id(
			'input-value-' + $elm$core$String$fromInt(index));
		var errorIdAttr = $elm$html$Html$Attributes$id(
			'error-input-value-' + $elm$core$String$fromInt(index));
		var errorMessage = isOptionInvalid ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					errorIdAttr,
					$elm$html$Html$Attributes$class('error-message')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$ul,
					_List_Nil,
					A2(
						$elm$core$List$map,
						makeValidationErrorMessage,
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							A2($elm$core$Maybe$map, $author$project$Option$getOptionValidationErrors, maybeOption))))
				])) : $elm$html$Html$text('');
		var classes = _List_fromArray(
			[
				_Utils_Tuple2('input-value', true),
				_Utils_Tuple2('invalid', isOptionInvalid)
			]);
		var ariaLabel = A2($elm$html$Html$Attributes$attribute, 'aria-label', 'much-select-value');
		var inputHtml = $author$project$SelectionMode$isDisabled(selectionConfig) ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$disabled(true),
					idAttr,
					ariaLabel,
					A2($elm$html$Html$Attributes$attribute, 'part', 'input-value'),
					placeholderAttribute,
					$elm$html$Html$Attributes$classList(classes),
					$elm$html$Html$Attributes$value(valueString)
				]),
			_List_Nil) : A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					ariaLabel,
					A2($elm$html$Html$Attributes$attribute, 'part', 'input-value'),
					$elm$html$Html$Attributes$classList(classes),
					$elm$html$Html$Events$onInput(
					$author$project$MuchSelect$UpdateOptionValueValue(index)),
					$elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur),
					$elm$html$Html$Attributes$value(valueString),
					placeholderAttribute,
					$elm$html$Html$Attributes$list('datalist-options')
				]),
			_List_Nil);
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('input-wrapper'),
						A2($elm$html$Html$Attributes$attribute, 'part', 'input-wrapper')
					]),
				_List_fromArray(
					[
						inputHtml,
						A4(
						$author$project$MuchSelect$rightSlotHtml,
						rightSlot,
						$author$project$SelectionMode$getInteractionState(selectionConfig),
						$author$project$SelectionMode$isDisabled(selectionConfig),
						index)
					])),
				errorMessage
			]);
	});
var $author$project$MuchSelect$multiSelectViewDataset = F3(
	function (selectionConfig, options, rightSlot) {
		var selectedOptions = $author$project$OptionsUtilities$selectedOptions(options);
		var makeInputs = function (selectedOptions_) {
			var _v0 = $elm$core$List$length(selectedOptions_);
			if (!_v0) {
				return A4($author$project$MuchSelect$multiSelectDatasetInputField, $elm$core$Maybe$Nothing, selectionConfig, rightSlot, 0);
			} else {
				return A2(
					$elm$core$List$concatMap,
					function (selectedOption) {
						return A4(
							$author$project$MuchSelect$multiSelectDatasetInputField,
							$elm$core$Maybe$Just(selectedOption),
							selectionConfig,
							rightSlot,
							$author$project$Option$getOptionSelectedIndex(selectedOption));
					},
					selectedOptions_);
			}
		};
		var hasPendingValidation = $author$project$OptionsUtilities$hasAnyPendingValidation(selectedOptions);
		var hasOptionSelected = $author$project$OptionsUtilities$hasSelectedOption(options);
		var hasAnError = !$author$project$OptionsUtilities$allOptionsAreValid(selectedOptions);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasAnError, hasPendingValidation),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, hasAnError))
				]),
			makeInputs(selectedOptions));
	});
var $author$project$MuchSelect$multiSelectView = F4(
	function (selectionMode, options, searchString, rightSlot) {
		var _v0 = $author$project$SelectionMode$getOutputStyle(selectionMode);
		if (_v0.$ === 'CustomHtml') {
			return A4($author$project$MuchSelect$multiSelectViewCustomHtml, selectionMode, options, searchString, rightSlot);
		} else {
			return A3($author$project$MuchSelect$multiSelectViewDataset, selectionMode, options, rightSlot);
		}
	});
var $author$project$Option$optionToValueLabelTuple = function (option) {
	return _Utils_Tuple2(
		$author$project$Option$getOptionValueAsString(option),
		$author$project$OptionLabel$optionLabelToString(
			$author$project$Option$getOptionLabel(option)));
};
var $author$project$OptionsUtilities$selectedOptionsToTuple = function (options) {
	return A2(
		$elm$core$List$map,
		$author$project$Option$optionToValueLabelTuple,
		$author$project$OptionsUtilities$selectedOptions(options));
};
var $author$project$MuchSelect$DeleteInputForSingleSelect = {$: 'DeleteInputForSingleSelect'};
var $robinheghan$keyboard_events$Keyboard$Events$customPerKey = F2(
	function (event, decisionMap) {
		return A2(
			$elm$html$Html$Events$custom,
			$robinheghan$keyboard_events$Keyboard$Events$eventToString(event),
			$robinheghan$keyboard_events$Keyboard$Events$messageSelector(decisionMap));
	});
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
var $author$project$MuchSelect$singleSelectCustomHtmlInputField = F5(
	function (searchString, isDisabled, focused, placeholderTuple, hasSelectedOption) {
		var typeAttr = $elm$html$Html$Attributes$type_('text');
		var showPlaceholder = (!hasSelectedOption) && ((!focused) && placeholderTuple.a);
		var placeholderAttribute = showPlaceholder ? $elm$html$Html$Attributes$placeholder(placeholderTuple.b) : A2($elm$html$Html$Attributes$style, '', '');
		var partAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'input-filter');
		var onFocusAttr = $elm$html$Html$Events$onFocus($author$project$MuchSelect$InputFocus);
		var onBlurAttr = $elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur);
		var keyboardEvents = A2(
			$robinheghan$keyboard_events$Keyboard$Events$customPerKey,
			$robinheghan$keyboard_events$Keyboard$Events$Keydown,
			_List_fromArray(
				[
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Enter,
					{message: $author$project$MuchSelect$SelectHighlightedOption, preventDefault: false, stopPropagation: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Backspace,
					{message: $author$project$MuchSelect$DeleteInputForSingleSelect, preventDefault: false, stopPropagation: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Delete,
					{message: $author$project$MuchSelect$DeleteInputForSingleSelect, preventDefault: false, stopPropagation: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Escape,
					{message: $author$project$MuchSelect$EscapeKeyInInputFilter, preventDefault: false, stopPropagation: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$ArrowUp,
					{message: $author$project$MuchSelect$MoveHighlightedOptionUp, preventDefault: true, stopPropagation: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$ArrowDown,
					{message: $author$project$MuchSelect$MoveHighlightedOptionDown, preventDefault: true, stopPropagation: false})
				]));
		var idAttr = $elm$html$Html$Attributes$id('input-filter');
		return isDisabled ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$disabled(true),
					idAttr,
					partAttr,
					placeholderAttribute
				]),
			_List_Nil) : (hasSelectedOption ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					partAttr,
					onBlurAttr,
					onFocusAttr,
					$elm$html$Html$Attributes$value(''),
					$elm$html$Html$Attributes$maxlength(0),
					placeholderAttribute,
					keyboardEvents
				]),
			_List_Nil) : A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					partAttr,
					onBlurAttr,
					onFocusAttr,
					$author$project$MuchSelect$onMouseDownStopPropagation($author$project$MuchSelect$NoOp),
					$author$project$MuchSelect$onMouseUpStopPropagation($author$project$MuchSelect$NoOp),
					$elm$html$Html$Events$onInput($author$project$MuchSelect$UpdateSearchString),
					$elm$html$Html$Attributes$value(
					$author$project$SearchString$toString(searchString)),
					placeholderAttribute,
					keyboardEvents
				]),
			_List_Nil));
	});
var $author$project$MuchSelect$singleSelectViewCustomHtml = F4(
	function (selectionConfig, options, searchString, rightSlot) {
		var hasPendingValidation = $author$project$OptionsUtilities$hasAnyPendingValidation(options);
		var hasOptionSelected = $author$project$OptionsUtilities$hasSelectedOption(options);
		var valueStr = hasOptionSelected ? A2(
			$elm$core$Maybe$withDefault,
			'',
			$elm$core$List$head(
				A2(
					$elm$core$List$map,
					$elm$core$Tuple$second,
					$author$project$OptionsUtilities$selectedOptionsToTuple(options)))) : '';
		var hasErrors = $author$project$OptionsUtilities$hasAnyValidationErrors(options);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasErrors, hasPendingValidation),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isFocused(selectionConfig),
					$elm$html$Html$Events$onMouseDown($author$project$MuchSelect$NoOp)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					(!$author$project$SelectionMode$isFocused(selectionConfig)) && (!$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Events$onMouseUp($author$project$MuchSelect$BringInputInFocus)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					(!$author$project$SelectionMode$isFocused(selectionConfig)) && (!$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Events$onFocus($author$project$MuchSelect$BringInputInFocus)),
					$author$project$MuchSelect$tabIndexAttribute(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, false))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('selected-value'),
							A2($elm$html$Html$Attributes$attribute, 'part', 'selected-value')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(valueStr)
						])),
					A5(
					$author$project$MuchSelect$singleSelectCustomHtmlInputField,
					searchString,
					$author$project$SelectionMode$isDisabled(selectionConfig),
					$author$project$SelectionMode$isFocused(selectionConfig),
					$author$project$SelectionMode$getPlaceholder(selectionConfig),
					hasOptionSelected),
					function () {
					switch (rightSlot.$) {
						case 'ShowNothing':
							return $elm$html$Html$text('');
						case 'ShowLoadingIndicator':
							return A3(
								$elm$html$Html$node,
								'slot',
								_List_fromArray(
									[
										$elm$html$Html$Attributes$name('loading-indicator')
									]),
								_List_fromArray(
									[$author$project$MuchSelect$defaultLoadingIndicator]));
						case 'ShowDropdownIndicator':
							var transitioning = rightSlot.a;
							return A2(
								$author$project$MuchSelect$dropdownIndicator,
								$author$project$SelectionMode$getInteractionState(selectionConfig),
								transitioning);
						case 'ShowClearButton':
							return A3(
								$elm$html$Html$node,
								'slot',
								_List_fromArray(
									[
										$elm$html$Html$Attributes$name('clear-button')
									]),
								_List_Nil);
						case 'ShowAddButton':
							return $elm$html$Html$text('');
						default:
							return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $author$project$MuchSelect$singleSelectDatasetInputField = F3(
	function (maybeOption, selectionMode, hasSelectedOption) {
		var valueString = function () {
			if (maybeOption.$ === 'Just') {
				var option = maybeOption.a;
				return $author$project$Option$getOptionValueAsString(option);
			} else {
				return '';
			}
		}();
		var typeAttr = $elm$html$Html$Attributes$type_('text');
		var showPlaceholder = (!hasSelectedOption) && (!$author$project$SelectionMode$isFocused(selectionMode));
		var placeholderAttribute = showPlaceholder ? $elm$html$Html$Attributes$placeholder(
			$author$project$SelectionMode$getPlaceholderString(selectionMode)) : $elm_community$html_extra$Html$Attributes$Extra$empty;
		var partAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'input-value');
		var onFocusAttr = $elm$html$Html$Events$onFocus($author$project$MuchSelect$InputFocus);
		var onBlurAttr = $elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur);
		var idAttr = $elm$html$Html$Attributes$id('input-value');
		var ariaLabel = A2($elm$html$Html$Attributes$attribute, 'aria-label', 'much-select-value');
		return $author$project$SelectionMode$isDisabled(selectionMode) ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$disabled(true),
					idAttr,
					ariaLabel,
					partAttr,
					placeholderAttribute,
					$elm$html$Html$Attributes$value(valueString)
				]),
			_List_Nil) : A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					ariaLabel,
					partAttr,
					onBlurAttr,
					onFocusAttr,
					$elm$html$Html$Events$onInput(
					$author$project$MuchSelect$UpdateOptionValueValue(0)),
					$elm$html$Html$Attributes$value(valueString),
					placeholderAttribute,
					$elm$html$Html$Attributes$list('datalist-options')
				]),
			_List_Nil);
	});
var $author$project$MuchSelect$singleSelectViewDatalistHtml = F2(
	function (selectionConfig, options) {
		var maybeSelectedOption = $author$project$OptionsUtilities$findSelectedOption(options);
		var hasPendingValidation = $author$project$OptionsUtilities$hasAnyPendingValidation(options);
		var hasOptionSelected = $author$project$OptionsUtilities$hasSelectedOption(options);
		var hasAnError = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Basics$not,
				A2(
					$elm$core$Maybe$map,
					$elm$core$List$isEmpty,
					A2($elm$core$Maybe$map, $author$project$Option$getOptionValidationErrors, maybeSelectedOption))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasAnError, hasPendingValidation),
					$author$project$MuchSelect$tabIndexAttribute(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, hasAnError))
				]),
			_List_fromArray(
				[
					A3($author$project$MuchSelect$singleSelectDatasetInputField, maybeSelectedOption, selectionConfig, hasOptionSelected)
				]));
	});
var $author$project$MuchSelect$singleSelectView = F4(
	function (selectionMode, options, searchString, rightSlot) {
		var _v0 = $author$project$SelectionMode$getOutputStyle(selectionMode);
		if (_v0.$ === 'CustomHtml') {
			return A4($author$project$MuchSelect$singleSelectViewCustomHtml, selectionMode, options, searchString, rightSlot);
		} else {
			return A2($author$project$MuchSelect$singleSelectViewDatalistHtml, selectionMode, options);
		}
	});
var $author$project$MuchSelect$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('wrapper'),
				A2($elm$html$Html$Attributes$attribute, 'part', 'wrapper'),
				function () {
				var _v0 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
				if (_v0.$ === 'CustomHtml') {
					return $author$project$MuchSelect$onMouseDownStopPropagationAndPreventDefault($author$project$MuchSelect$NoOp);
				} else {
					return $elm_community$html_extra$Html$Attributes$Extra$empty;
				}
			}(),
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'disabled',
						$author$project$SelectionMode$isDisabled(model.selectionConfig))
					]))
			]),
		_List_fromArray(
			[
				$author$project$SelectionMode$isSingleSelect(model.selectionConfig) ? A4($author$project$MuchSelect$singleSelectView, model.selectionConfig, model.options, model.searchString, model.rightSlot) : A4($author$project$MuchSelect$multiSelectView, model.selectionConfig, model.options, model.searchString, model.rightSlot),
				function () {
				var _v1 = $author$project$SelectionMode$getOutputStyle(model.selectionConfig);
				if (_v1.$ === 'CustomHtml') {
					return A4($author$project$MuchSelect$dropdown, model.selectionConfig, model.options, model.searchString, model.valueCasing);
				} else {
					return $author$project$MuchSelect$datalist(model.options);
				}
			}()
			]));
};
var $author$project$MuchSelect$main = $elm$browser$Browser$element(
	{
		init: function (flags) {
			return A2(
				$elm$core$Tuple$mapSecond,
				$author$project$MuchSelect$perform,
				$author$project$MuchSelect$init(flags));
		},
		subscriptions: $author$project$MuchSelect$subscriptions,
		update: $author$project$MuchSelect$updateWrapper,
		view: $author$project$MuchSelect$view
	});
/*
_Platform_export({'MuchSelect':{'init':$author$project$MuchSelect$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (transformationAndValidationJson) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (showDropdownFooter) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (selectedValueEncoding) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (selectedValue) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (selectedItemStaysInPlace) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (searchStringMinimumLength) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (placeholder) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (outputStyle) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (optionsJson) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (optionSort) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (maxDropdownItems) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (loading) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (isEventsOnly) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (enableMultiSelectSingleItemRemoval) {
																													return A2(
																														$elm$json$Json$Decode$andThen,
																														function (disabled) {
																															return A2(
																																$elm$json$Json$Decode$andThen,
																																function (customOptionHint) {
																																	return A2(
																																		$elm$json$Json$Decode$andThen,
																																		function (allowMultiSelect) {
																																			return A2(
																																				$elm$json$Json$Decode$andThen,
																																				function (allowCustomOptions) {
																																					return $elm$json$Json$Decode$succeed(
																																						{allowCustomOptions: allowCustomOptions, allowMultiSelect: allowMultiSelect, customOptionHint: customOptionHint, disabled: disabled, enableMultiSelectSingleItemRemoval: enableMultiSelectSingleItemRemoval, isEventsOnly: isEventsOnly, loading: loading, maxDropdownItems: maxDropdownItems, optionSort: optionSort, optionsJson: optionsJson, outputStyle: outputStyle, placeholder: placeholder, searchStringMinimumLength: searchStringMinimumLength, selectedItemStaysInPlace: selectedItemStaysInPlace, selectedValue: selectedValue, selectedValueEncoding: selectedValueEncoding, showDropdownFooter: showDropdownFooter, transformationAndValidationJson: transformationAndValidationJson});
																																				},
																																				A2($elm$json$Json$Decode$field, 'allowCustomOptions', $elm$json$Json$Decode$bool));
																																		},
																																		A2($elm$json$Json$Decode$field, 'allowMultiSelect', $elm$json$Json$Decode$bool));
																																},
																																A2(
																																	$elm$json$Json$Decode$field,
																																	'customOptionHint',
																																	$elm$json$Json$Decode$oneOf(
																																		_List_fromArray(
																																			[
																																				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																																				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																																			]))));
																														},
																														A2($elm$json$Json$Decode$field, 'disabled', $elm$json$Json$Decode$bool));
																												},
																												A2($elm$json$Json$Decode$field, 'enableMultiSelectSingleItemRemoval', $elm$json$Json$Decode$bool));
																										},
																										A2($elm$json$Json$Decode$field, 'isEventsOnly', $elm$json$Json$Decode$bool));
																								},
																								A2($elm$json$Json$Decode$field, 'loading', $elm$json$Json$Decode$bool));
																						},
																						A2(
																							$elm$json$Json$Decode$field,
																							'maxDropdownItems',
																							$elm$json$Json$Decode$oneOf(
																								_List_fromArray(
																									[
																										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																									]))));
																				},
																				A2($elm$json$Json$Decode$field, 'optionSort', $elm$json$Json$Decode$string));
																		},
																		A2($elm$json$Json$Decode$field, 'optionsJson', $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$field, 'outputStyle', $elm$json$Json$Decode$string));
														},
														A2(
															$elm$json$Json$Decode$field,
															'placeholder',
															A2(
																$elm$json$Json$Decode$andThen,
																function (_v0) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (_v1) {
																			return $elm$json$Json$Decode$succeed(
																				_Utils_Tuple2(_v0, _v1));
																		},
																		A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool))));
												},
												A2(
													$elm$json$Json$Decode$field,
													'searchStringMinimumLength',
													$elm$json$Json$Decode$oneOf(
														_List_fromArray(
															[
																$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
															]))));
										},
										A2($elm$json$Json$Decode$field, 'selectedItemStaysInPlace', $elm$json$Json$Decode$bool));
								},
								A2($elm$json$Json$Decode$field, 'selectedValue', $elm$json$Json$Decode$string));
						},
						A2(
							$elm$json$Json$Decode$field,
							'selectedValueEncoding',
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
									]))));
				},
				A2($elm$json$Json$Decode$field, 'showDropdownFooter', $elm$json$Json$Decode$bool));
		},
		A2($elm$json$Json$Decode$field, 'transformationAndValidationJson', $elm$json$Json$Decode$string)))({"versions":{"elm":"0.19.1"},"types":{"message":"MuchSelect.Msg","aliases":{"Json.Decode.Value":{"args":[],"type":"Json.Encode.Value"},"OptionSearchFilter.OptionSearchFilter":{"args":[],"type":"{ totalScore : Basics.Int, bestScore : Basics.Int, labelTokens : List.List ( Basics.Bool, String.String ), descriptionTokens : List.List ( Basics.Bool, String.String ), groupTokens : List.List ( Basics.Bool, String.String ) }"}},"unions":{"MuchSelect.Msg":{"args":[],"tags":{"NoOp":[],"BringInputInFocus":[],"BringInputOutOfFocus":[],"InputBlur":[],"InputFocus":[],"DropdownMouseOverOption":["OptionValue.OptionValue"],"DropdownMouseOutOption":["OptionValue.OptionValue"],"DropdownMouseDownOption":["OptionValue.OptionValue"],"DropdownMouseUpOption":["OptionValue.OptionValue"],"UpdateSearchString":["String.String"],"SearchStringSteady":[],"UpdateOptionValueValue":["Basics.Int","String.String"],"TextInputOnInput":["String.String"],"ValueChanged":["Json.Decode.Value"],"OptionsReplaced":["Json.Decode.Value"],"OptionSortingChanged":["String.String"],"AddOptions":["Json.Decode.Value"],"RemoveOptions":["Json.Decode.Value"],"SelectOption":["Json.Decode.Value"],"DeselectOption":["Json.Decode.Value"],"DeselectOptionInternal":["Option.Option"],"PlaceholderAttributeChanged":["( Basics.Bool, String.String )"],"LoadingAttributeChanged":["Basics.Bool"],"MaxDropdownItemsChanged":["String.String"],"ShowDropdownFooterChanged":["Basics.Bool"],"AllowCustomOptionsChanged":["( Basics.Bool, String.String )"],"DisabledAttributeChanged":["Basics.Bool"],"MultiSelectAttributeChanged":["Basics.Bool"],"MultiSelectSingleItemRemovalAttributeChanged":["Basics.Bool"],"SearchStringMinimumLengthAttributeChanged":["Basics.Int"],"SelectedItemStaysInPlaceChanged":["Basics.Bool"],"OutputStyleChanged":["String.String"],"SelectHighlightedOption":[],"DeleteInputForSingleSelect":[],"EscapeKeyInInputFilter":[],"MoveHighlightedOptionUp":[],"MoveHighlightedOptionDown":[],"ValueCasingWidthUpdate":["{ width : Basics.Float, height : Basics.Float }"],"ClearAllSelectedOptions":[],"ToggleSelectedValueHighlight":["OptionValue.OptionValue"],"DeleteKeydownForMultiSelect":[],"AddMultiSelectValue":["Basics.Int"],"RemoveMultiSelectValue":["Basics.Int"],"RequestAllOptions":[],"UpdateSearchResultsForOptions":["Json.Encode.Value"],"CustomValidationResponse":["Json.Encode.Value"],"UpdateTransformationAndValidation":["Json.Encode.Value"],"AttributeChanged":["( String.String, String.String )"],"AttributeRemoved":["String.String"],"CustomOptionHintChanged":["String.String"],"SelectedValueEncodingChanged":["String.String"],"RequestConfigState":[],"RequestSelectedValues":[]}},"Basics.Bool":{"args":[],"tags":{"True":[],"False":[]}},"Basics.Float":{"args":[],"tags":{"Float":[]}},"Basics.Int":{"args":[],"tags":{"Int":[]}},"Option.Option":{"args":[],"tags":{"Option":["OptionDisplay.OptionDisplay","OptionLabel.OptionLabel","OptionValue.OptionValue","Option.OptionDescription","Option.OptionGroup","Maybe.Maybe OptionSearchFilter.OptionSearchFilter"],"CustomOption":["OptionDisplay.OptionDisplay","OptionLabel.OptionLabel","OptionValue.OptionValue","Maybe.Maybe OptionSearchFilter.OptionSearchFilter"],"DatalistOption":["OptionDisplay.OptionDisplay","OptionValue.OptionValue"],"EmptyOption":["OptionDisplay.OptionDisplay","OptionLabel.OptionLabel"]}},"OptionValue.OptionValue":{"args":[],"tags":{"OptionValue":["String.String"],"EmptyOptionValue":[]}},"String.String":{"args":[],"tags":{"String":[]}},"Json.Encode.Value":{"args":[],"tags":{"Value":[]}},"List.List":{"args":["a"],"tags":{}},"Maybe.Maybe":{"args":["a"],"tags":{"Just":["a"],"Nothing":[]}},"Option.OptionDescription":{"args":[],"tags":{"OptionDescription":["String.String","Maybe.Maybe String.String"],"NoDescription":[]}},"OptionDisplay.OptionDisplay":{"args":[],"tags":{"OptionShown":["OptionDisplay.OptionAge"],"OptionHidden":[],"OptionSelected":["Basics.Int","OptionDisplay.OptionAge"],"OptionSelectedAndInvalid":["Basics.Int","List.List TransformAndValidate.ValidationFailureMessage"],"OptionSelectedPendingValidation":["Basics.Int"],"OptionSelectedHighlighted":["Basics.Int"],"OptionHighlighted":[],"OptionActivated":[],"OptionDisabled":["OptionDisplay.OptionAge"]}},"Option.OptionGroup":{"args":[],"tags":{"OptionGroup":["String.String"],"NoOptionGroup":[]}},"OptionLabel.OptionLabel":{"args":[],"tags":{"OptionLabel":["String.String","Maybe.Maybe String.String","SortRank.SortRank"]}},"OptionDisplay.OptionAge":{"args":[],"tags":{"NewOption":[],"MatureOption":[]}},"SortRank.SortRank":{"args":[],"tags":{"Auto":["PositiveInt.PositiveInt"],"Manual":["PositiveInt.PositiveInt"],"NoSortRank":[]}},"TransformAndValidate.ValidationFailureMessage":{"args":[],"tags":{"ValidationFailureMessage":["TransformAndValidate.ValidationReportLevel","TransformAndValidate.ValidationErrorMessage"]}},"PositiveInt.PositiveInt":{"args":[],"tags":{"PositiveInt":["Basics.Int"]}},"TransformAndValidate.ValidationErrorMessage":{"args":[],"tags":{"ValidationErrorMessage":["String.String"]}},"TransformAndValidate.ValidationReportLevel":{"args":[],"tags":{"SilentError":[],"ShowError":[]}}}}})}});}(this));
*/
export const Elm = {'MuchSelect':{'init':$author$project$MuchSelect$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (transformationAndValidationJson) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (showDropdownFooter) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (selectedValueEncoding) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (selectedValue) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (selectedItemStaysInPlace) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (searchStringMinimumLength) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (placeholder) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (outputStyle) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (optionsJson) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (optionSort) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (maxDropdownItems) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (loading) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (isEventsOnly) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (enableMultiSelectSingleItemRemoval) {
																													return A2(
																														$elm$json$Json$Decode$andThen,
																														function (disabled) {
																															return A2(
																																$elm$json$Json$Decode$andThen,
																																function (customOptionHint) {
																																	return A2(
																																		$elm$json$Json$Decode$andThen,
																																		function (allowMultiSelect) {
																																			return A2(
																																				$elm$json$Json$Decode$andThen,
																																				function (allowCustomOptions) {
																																					return $elm$json$Json$Decode$succeed(
																																						{allowCustomOptions: allowCustomOptions, allowMultiSelect: allowMultiSelect, customOptionHint: customOptionHint, disabled: disabled, enableMultiSelectSingleItemRemoval: enableMultiSelectSingleItemRemoval, isEventsOnly: isEventsOnly, loading: loading, maxDropdownItems: maxDropdownItems, optionSort: optionSort, optionsJson: optionsJson, outputStyle: outputStyle, placeholder: placeholder, searchStringMinimumLength: searchStringMinimumLength, selectedItemStaysInPlace: selectedItemStaysInPlace, selectedValue: selectedValue, selectedValueEncoding: selectedValueEncoding, showDropdownFooter: showDropdownFooter, transformationAndValidationJson: transformationAndValidationJson});
																																				},
																																				A2($elm$json$Json$Decode$field, 'allowCustomOptions', $elm$json$Json$Decode$bool));
																																		},
																																		A2($elm$json$Json$Decode$field, 'allowMultiSelect', $elm$json$Json$Decode$bool));
																																},
																																A2(
																																	$elm$json$Json$Decode$field,
																																	'customOptionHint',
																																	$elm$json$Json$Decode$oneOf(
																																		_List_fromArray(
																																			[
																																				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																																				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																																			]))));
																														},
																														A2($elm$json$Json$Decode$field, 'disabled', $elm$json$Json$Decode$bool));
																												},
																												A2($elm$json$Json$Decode$field, 'enableMultiSelectSingleItemRemoval', $elm$json$Json$Decode$bool));
																										},
																										A2($elm$json$Json$Decode$field, 'isEventsOnly', $elm$json$Json$Decode$bool));
																								},
																								A2($elm$json$Json$Decode$field, 'loading', $elm$json$Json$Decode$bool));
																						},
																						A2(
																							$elm$json$Json$Decode$field,
																							'maxDropdownItems',
																							$elm$json$Json$Decode$oneOf(
																								_List_fromArray(
																									[
																										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																									]))));
																				},
																				A2($elm$json$Json$Decode$field, 'optionSort', $elm$json$Json$Decode$string));
																		},
																		A2($elm$json$Json$Decode$field, 'optionsJson', $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$field, 'outputStyle', $elm$json$Json$Decode$string));
														},
														A2(
															$elm$json$Json$Decode$field,
															'placeholder',
															A2(
																$elm$json$Json$Decode$andThen,
																function (_v0) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (_v1) {
																			return $elm$json$Json$Decode$succeed(
																				_Utils_Tuple2(_v0, _v1));
																		},
																		A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool))));
												},
												A2(
													$elm$json$Json$Decode$field,
													'searchStringMinimumLength',
													$elm$json$Json$Decode$oneOf(
														_List_fromArray(
															[
																$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
															]))));
										},
										A2($elm$json$Json$Decode$field, 'selectedItemStaysInPlace', $elm$json$Json$Decode$bool));
								},
								A2($elm$json$Json$Decode$field, 'selectedValue', $elm$json$Json$Decode$string));
						},
						A2(
							$elm$json$Json$Decode$field,
							'selectedValueEncoding',
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
									]))));
				},
				A2($elm$json$Json$Decode$field, 'showDropdownFooter', $elm$json$Json$Decode$bool));
		},
		A2($elm$json$Json$Decode$field, 'transformationAndValidationJson', $elm$json$Json$Decode$string)))({"versions":{"elm":"0.19.1"},"types":{"message":"MuchSelect.Msg","aliases":{"Json.Decode.Value":{"args":[],"type":"Json.Encode.Value"},"OptionSearchFilter.OptionSearchFilter":{"args":[],"type":"{ totalScore : Basics.Int, bestScore : Basics.Int, labelTokens : List.List ( Basics.Bool, String.String ), descriptionTokens : List.List ( Basics.Bool, String.String ), groupTokens : List.List ( Basics.Bool, String.String ) }"}},"unions":{"MuchSelect.Msg":{"args":[],"tags":{"NoOp":[],"BringInputInFocus":[],"BringInputOutOfFocus":[],"InputBlur":[],"InputFocus":[],"DropdownMouseOverOption":["OptionValue.OptionValue"],"DropdownMouseOutOption":["OptionValue.OptionValue"],"DropdownMouseDownOption":["OptionValue.OptionValue"],"DropdownMouseUpOption":["OptionValue.OptionValue"],"UpdateSearchString":["String.String"],"SearchStringSteady":[],"UpdateOptionValueValue":["Basics.Int","String.String"],"TextInputOnInput":["String.String"],"ValueChanged":["Json.Decode.Value"],"OptionsReplaced":["Json.Decode.Value"],"OptionSortingChanged":["String.String"],"AddOptions":["Json.Decode.Value"],"RemoveOptions":["Json.Decode.Value"],"SelectOption":["Json.Decode.Value"],"DeselectOption":["Json.Decode.Value"],"DeselectOptionInternal":["Option.Option"],"PlaceholderAttributeChanged":["( Basics.Bool, String.String )"],"LoadingAttributeChanged":["Basics.Bool"],"MaxDropdownItemsChanged":["String.String"],"ShowDropdownFooterChanged":["Basics.Bool"],"AllowCustomOptionsChanged":["( Basics.Bool, String.String )"],"DisabledAttributeChanged":["Basics.Bool"],"MultiSelectAttributeChanged":["Basics.Bool"],"MultiSelectSingleItemRemovalAttributeChanged":["Basics.Bool"],"SearchStringMinimumLengthAttributeChanged":["Basics.Int"],"SelectedItemStaysInPlaceChanged":["Basics.Bool"],"OutputStyleChanged":["String.String"],"SelectHighlightedOption":[],"DeleteInputForSingleSelect":[],"EscapeKeyInInputFilter":[],"MoveHighlightedOptionUp":[],"MoveHighlightedOptionDown":[],"ValueCasingWidthUpdate":["{ width : Basics.Float, height : Basics.Float }"],"ClearAllSelectedOptions":[],"ToggleSelectedValueHighlight":["OptionValue.OptionValue"],"DeleteKeydownForMultiSelect":[],"AddMultiSelectValue":["Basics.Int"],"RemoveMultiSelectValue":["Basics.Int"],"RequestAllOptions":[],"UpdateSearchResultsForOptions":["Json.Encode.Value"],"CustomValidationResponse":["Json.Encode.Value"],"UpdateTransformationAndValidation":["Json.Encode.Value"],"AttributeChanged":["( String.String, String.String )"],"AttributeRemoved":["String.String"],"CustomOptionHintChanged":["String.String"],"SelectedValueEncodingChanged":["String.String"],"RequestConfigState":[],"RequestSelectedValues":[]}},"Basics.Bool":{"args":[],"tags":{"True":[],"False":[]}},"Basics.Float":{"args":[],"tags":{"Float":[]}},"Basics.Int":{"args":[],"tags":{"Int":[]}},"Option.Option":{"args":[],"tags":{"Option":["OptionDisplay.OptionDisplay","OptionLabel.OptionLabel","OptionValue.OptionValue","Option.OptionDescription","Option.OptionGroup","Maybe.Maybe OptionSearchFilter.OptionSearchFilter"],"CustomOption":["OptionDisplay.OptionDisplay","OptionLabel.OptionLabel","OptionValue.OptionValue","Maybe.Maybe OptionSearchFilter.OptionSearchFilter"],"DatalistOption":["OptionDisplay.OptionDisplay","OptionValue.OptionValue"],"EmptyOption":["OptionDisplay.OptionDisplay","OptionLabel.OptionLabel"]}},"OptionValue.OptionValue":{"args":[],"tags":{"OptionValue":["String.String"],"EmptyOptionValue":[]}},"String.String":{"args":[],"tags":{"String":[]}},"Json.Encode.Value":{"args":[],"tags":{"Value":[]}},"List.List":{"args":["a"],"tags":{}},"Maybe.Maybe":{"args":["a"],"tags":{"Just":["a"],"Nothing":[]}},"Option.OptionDescription":{"args":[],"tags":{"OptionDescription":["String.String","Maybe.Maybe String.String"],"NoDescription":[]}},"OptionDisplay.OptionDisplay":{"args":[],"tags":{"OptionShown":["OptionDisplay.OptionAge"],"OptionHidden":[],"OptionSelected":["Basics.Int","OptionDisplay.OptionAge"],"OptionSelectedAndInvalid":["Basics.Int","List.List TransformAndValidate.ValidationFailureMessage"],"OptionSelectedPendingValidation":["Basics.Int"],"OptionSelectedHighlighted":["Basics.Int"],"OptionHighlighted":[],"OptionActivated":[],"OptionDisabled":["OptionDisplay.OptionAge"]}},"Option.OptionGroup":{"args":[],"tags":{"OptionGroup":["String.String"],"NoOptionGroup":[]}},"OptionLabel.OptionLabel":{"args":[],"tags":{"OptionLabel":["String.String","Maybe.Maybe String.String","SortRank.SortRank"]}},"OptionDisplay.OptionAge":{"args":[],"tags":{"NewOption":[],"MatureOption":[]}},"SortRank.SortRank":{"args":[],"tags":{"Auto":["PositiveInt.PositiveInt"],"Manual":["PositiveInt.PositiveInt"],"NoSortRank":[]}},"TransformAndValidate.ValidationFailureMessage":{"args":[],"tags":{"ValidationFailureMessage":["TransformAndValidate.ValidationReportLevel","TransformAndValidate.ValidationErrorMessage"]}},"PositiveInt.PositiveInt":{"args":[],"tags":{"PositiveInt":["Basics.Int"]}},"TransformAndValidate.ValidationErrorMessage":{"args":[],"tags":{"ValidationErrorMessage":["String.String"]}},"TransformAndValidate.ValidationReportLevel":{"args":[],"tags":{"SilentError":[],"ShowError":[]}}}}})}};
  