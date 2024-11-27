from django.http import JsonResponse
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  AllowAny , IsAuthenticated
from rest_framework.exceptions import NotFound

# create book table
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBookTable(request):
    serializer = BookTableSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({
        'book_id': serializer.data['id'],
    }, status=201)

# get all book table by user id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBookTable(request):
    booktable = BookTable.objects.filter(user_id=request.user.id)
    serializer = BookTableSerializer(booktable, many=True)
    return Response(serializer.data)

# get book table by id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBookTableById(request, pk):
    try:
        booktable = BookTable.objects.get(id=pk)
        serializer = BookTableSerializer(booktable, many=False)
    except BookTable.DoesNotExist:
        raise NotFound('Book Table Not Found')
    return Response(serializer.data)

# delete book table by id
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBookTable(request, pk):
    try:
        booktable = BookTable.objects.get(id=pk)
    except BookTable.DoesNotExist:
        raise NotFound('Book Table Not Found')
    booktable.delete()
    return Response({'message': 'Book Table Deleted Successfully'})
