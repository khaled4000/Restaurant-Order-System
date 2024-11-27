from django.http import JsonResponse
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import CartSerializer
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  AllowAny , IsAuthenticated



# add food to cart for authenticated user and if the food is already in the cart, update the quantity
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFoodToCart(request):
    if request.method == 'POST':
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            food = serializer.validated_data['food']
            item_qty = serializer.validated_data['item_qty']
            try:
                cart = Cart.objects.get(food=food, user=request.user)
                cart.item_qty += item_qty
                cart.save()
                return Response({'message': 'Food quantity updated in cart'}, status=201)
            except Cart.DoesNotExist:
                serializer.save(user=request.user)
                return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    

#get all food in cart for authenticated user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFoodInCart(request):
    if request.method == 'GET':
        cart = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    
#delete food from cart for authenticated user (check if the food is in the cart)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFoodFromCart(request, pk):
    if request.method == 'DELETE':
        try:
            cart = Cart.objects.get(id=pk, user=request.user)  # Retrieve the cart based on ID and authenticated user
            if cart.food is not None:
                cart.delete()
                return Response({'message': 'Food deleted from cart'}, status=204)
            else:
                return Response({'message': 'Food not found in the cart'}, status=404)
        except Cart.DoesNotExist:
            return Response({'message': 'Cart not found'}, status=404)
    else:
        return Response({'message': 'Method not allowed'}, status=405)

#delete all food from cart for authenticated user
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAllFoodFromCart(request):
    if request.method == 'DELETE':
        cart = Cart.objects.filter(user=request.user)
        cart.delete()
        return Response({'message': 'All food deleted from cart'}, status=204)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    
#update food quantity in cart for authenticated user
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFoodQuantity(request, pk):
    try:
        # Retrieve the cart object by ID and ensure it belongs to the authenticated user
        cart = Cart.objects.get(id=pk, user=request.user)
    except Cart.DoesNotExist:
        return Response({'message': 'Cart not found'}, status=404)

    if request.method == 'PUT':
        serializer = CartSerializer(instance=cart, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    

# get total price of all food in cart for authenticated user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTotalPrice(request):
    if request.method == 'GET':
        cart = Cart.objects.filter(user=request.user)
        total_price = 0
        for item in cart:
            total_price += item.food.food_price * item.item_qty
        return Response({'total_price': total_price})
    else:
        return Response({'message': 'Method not allowed'}, status=405)


