from django.http import JsonResponse
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  AllowAny , IsAuthenticated
from .permission import IsAdmin




# get all food
@api_view(['GET'])
@permission_classes([AllowAny])  # Use AllowAny permission for testing purposes
def getAllFood(request):
    if request.method == 'GET':
        foods = Food.objects.all()
        serializer = FoodSerializer(foods, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    
# get food by name
@api_view(['GET'])
@permission_classes([AllowAny])
def getFoodByName(request, name):
    if request.method == 'GET':
        food = Food.objects.filter(food_name=name)
        serializer = FoodSerializer(food, many=True)
        if not food.exists():
            return Response({'message': 'Food not found'}, status=404)
        return JsonResponse(serializer.data, safe=False)
    else:
        return Response({'message': 'Method not allowed'}, status=405)

# add food
@api_view(['POST'])
@permission_classes([IsAdmin])
def addFood(request):
    data = request.data
    if request.method == 'POST':
        if request.user.is_superuser:
            serializer = FoodSerializer(data=request.data)
            if serializer.is_valid():
                if Food.objects.filter(food_name=data['food_name']).exists():  # Check if food already exists
                    return Response({'message': 'Food already exists'}, status=400)
                serializer.save()  # Add parentheses to invoke the save method
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({'message': 'You are not authorized to perform this action'}, status=403)
    else:
        return Response({'message': 'Method not allowed'}, status=405)


# delete food by name
@api_view(['DELETE'])
@permission_classes([IsAdmin])
def deleteFoodByName(request, name):
    if request.method == 'DELETE':
        if request.user.is_superuser:
            food = Food.objects.filter(food_name=name)
            food.delete()
            return Response({'message': 'Food deleted successfully'}, status=200)
        else:
            return Response({'message': 'You are not authorized to perform this action'}, status=403)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    

# update food by name
@api_view(['PUT'])
@permission_classes([IsAdmin])
def updateFoodByName(request, name):
    if request.method == 'PUT':
        if request.user.is_superuser:
            food = Food.objects.filter(food_name=name).first()
            serializer = FoodSerializer(instance=food, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({'message': 'You are not authorized to perform this action'}, status=403)
    else:
        return Response({'message': 'Method not allowed'}, status=405)