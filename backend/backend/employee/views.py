from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from employee.models import Employee, Position, Departament, LevelPosition
from employee.serializers import EmployeeSerializer, PositionSerializer, DepartamentSerializer, LevelPositionSerializer, \
    EmployeeListSerializer


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)


class GetUserByToken(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        user: User = request.user
        data = {
            "isStaff": user.is_staff,
            "isEmployee": False,
            "isCustomer": False,
        }

        try:
            employee = user.employee
            data["isEmployee"] = True
        except Exception:
            pass

        try:
            employee = user.customer
            data["isCustomer"] = True
        except Exception:
            pass

        return Response(data=data, status=status.HTTP_200_OK)


class PositionCreateAPIView(CreateAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (IsAuthenticated, IsAdminUser,)


class PositionListAPIView(ListAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (IsAuthenticated,)


class DepartamentListAPIView(ListAPIView):
    queryset = Departament.objects.all()
    serializer_class = DepartamentSerializer
    permission_classes = (IsAuthenticated,)


class LevelPositionListAPIView(ListAPIView):
    queryset = LevelPosition.objects.all()
    serializer_class = LevelPositionSerializer
    permission_classes = (IsAuthenticated,)


class EmployeeListAPIView(ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeListSerializer
    permission_classes = (IsAuthenticated, IsAdminUser,)
