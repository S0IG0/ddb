from random import choice

from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from employee.models import Employee
from employee.signals import DefaultPosition
from request.models import PriceList, Request, State
from request.serializers import PriceListSerializer, RequestSerializer, RequestCreateSerializer, StateSerializer


class PriceListListAPIView(ListAPIView):
    queryset = PriceList.objects.all()
    serializer_class = PriceListSerializer
    permission_classes = (AllowAny,)


class StateListAPIView(ListAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    permission_classes = (IsAuthenticated,)


class RequestListAPIView(ListAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        queryset = Request.objects.filter(customer=user.customer)

        return queryset


class RequestCreateAPIView(CreateAPIView):
    serializer_class = RequestCreateSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        state = State.objects.all()[0]
        random_manager = choice(Employee.objects.filter(position__name=DefaultPosition.manager))
        customer = self.request.user.customer

        serializer.save(
            state=state,
            manager=random_manager,
            customer=customer
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        instance = serializer.instance
        serialized_data = RequestSerializer(instance)
        return Response(serialized_data.data)
