from django.http import JsonResponse
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  AllowAny , IsAuthenticated
from rest_framework.exceptions import NotFound



#create bill details
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBillDetails(request):
    serializer = BillDetailsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# get all bill details by bill id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBillDetails(request):
    try:
        serializers=BillDetailsSerializer(BillDetails.objects.all(),many=True)
    except BillDetails.DoesNotExist:
        raise NotFound(f"BillDetails with id not found.")
    return Response(serializers.data)
