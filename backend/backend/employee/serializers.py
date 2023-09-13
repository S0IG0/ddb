from rest_framework.serializers import ModelSerializer

from customer.serializers import UserSerializer
from employee.models import Employee, Position, Departament, LevelPosition


class EmployeeSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Employee
        fields = '__all__'


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class DepartamentSerializer(ModelSerializer):
    class Meta:
        model = Departament
        fields = '__all__'


class LevelPositionSerializer(ModelSerializer):
    class Meta:
        model = LevelPosition
        fields = '__all__'


class EmployeeListSerializer(ModelSerializer):
    user = UserSerializer()
    departament = DepartamentSerializer()
    position = PositionSerializer()
    level_position = LevelPositionSerializer()

    class Meta:
        model = Employee
        fields = '__all__'
