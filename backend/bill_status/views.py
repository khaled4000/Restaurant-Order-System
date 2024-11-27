from django.http import JsonResponse
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  AllowAny , IsAuthenticated , IsAdminUser
from datetime import datetime as Datetime
from rest_framework.exceptions import NotFound


# user create bill status , with all the fields
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBillStatus(request):
    bill_status = BillStatus.objects.create(
        user_id=request.user,
        bill_address=request.data['bill_address'],
        bill_discount=request.data['bill_discount'],
        bill_delivery=3,
        bill_total=request.data['bill_total'],
        bill_status="unpaid",
        bill_phone=request.data['bill_phone'],
        bill_when=str(Datetime.now()),
        bill_method="cash"
    )
    serializer = BillStatusSerializer(bill_status, many=False)
    return Response(serializer.data)

# get all bill status by user id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBillStatus(request):
    bill_status = BillStatus.objects.filter(user_id=request.user.id)
    serializer = BillStatusSerializer(bill_status, many=True)
    return Response(serializer.data)

# get bill status by id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBillStatusById(request, pk):
    try:
        bill_status = BillStatus.objects.get(id=pk)
    except BillStatus.DoesNotExist:
        raise NotFound(f"BillStatus with id {pk} not found.")

    serializer = BillStatusSerializer(bill_status, many=False)
    return Response(serializer.data)

# update bill status by id
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBillStatus(request, pk):
    try:
        bill_status = BillStatus.objects.get(id=pk)
        serializer = BillStatusSerializer(instance=bill_status, data=request.data)
    except BillStatus.DoesNotExist:
        raise NotFound(f"BillStatus with id {pk} not found.")
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# cancel bill status by id

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancelBillStatusByUser(request, pk):
    try:
        bill_status = BillStatus.objects.get(id=pk)
    except BillStatus.DoesNotExist:
        raise NotFound(f"BillStatus with id {pk} not found.")
    bill_status.delete()
    return Response({'message': 'Bill Status canceled successfully'}, status=200)


# admin send bill status to user
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def sendBillStatus(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        try:
            bill_status = BillStatus.objects.get(id=data.get('id'))
        except BillStatus.DoesNotExist:
            return Response({'message': 'Bill Status not found'}, status=404)
        
        if 'bill_status' in data:
            bill_status.bill_status = data['bill_status']
            bill_status.save()
            return Response({'message': 'Bill Status updated successfully'}, status=200)
        else:
            return Response({'message': 'Bill Status update requires "bill_status" field'}, status=400)
    else:
        return Response({'message': 'Method not allowed'}, status=405)
    

# admin cancel bill status
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def cancelBillStatus(request):
    if request.method == 'DELETE':
        data = request.data
        try:
            bill_status = BillStatus.objects.get(id=data.get('id'))
        except BillStatus.DoesNotExist:
            return Response({'message': 'Bill Status not found'}, status=404)
        
        bill_status.delete()
        return Response({'message': 'Bill Status deleted successfully'}, status=200)
    else:
        return Response({'message': 'Method not allowed'}, status=405)