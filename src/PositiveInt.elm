module PositiveInt exposing (PositiveInt, lessThanOrEqualTo, maybeNew, new, toInt)


type PositiveInt
    = PositiveInt Int


new : Int -> PositiveInt
new int =
    PositiveInt (abs int)


maybeNew : Int -> Maybe PositiveInt
maybeNew int =
    if int >= 0 then
        Just (PositiveInt int)

    else
        Nothing


toInt : PositiveInt -> Int
toInt positiveInt =
    case positiveInt of
        PositiveInt int ->
            int


lessThanOrEqualTo : PositiveInt -> Int -> Bool
lessThanOrEqualTo (PositiveInt a) b =
    a <= b
