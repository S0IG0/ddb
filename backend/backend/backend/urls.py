from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from customer.views import CustomerRegisterView
from employee.views import EmployeeViewSet, GetUserByToken, PositionCreateAPIView, PositionListAPIView, \
    DepartamentListAPIView, LevelPositionListAPIView, EmployeeListAPIView
from request.views import PriceListListAPIView, RequestListAPIView, RequestCreateAPIView, StateListAPIView

router = SimpleRouter()
router.register(r'api/register/employee', EmployeeViewSet)

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/customer/register/', CustomerRegisterView.as_view(), name='register_user'),
    path('api/user/who/', GetUserByToken.as_view(), name='get_user_by_token'),
    path('api/priceList/', PriceListListAPIView.as_view(), name='price_list'),
    path('api/request/', RequestListAPIView.as_view(), name='request_list'),
    path('api/request/create/', RequestCreateAPIView.as_view(), name='request_create'),
    path('api/position/create/', PositionCreateAPIView.as_view(), name='position_create'),

    path('api/position/', PositionListAPIView.as_view(), name='position'),
    path('api/department/', DepartamentListAPIView.as_view(), name='department'),
    path('api/levelPosition/', LevelPositionListAPIView.as_view(), name='level_position'),
    path('api/state/', StateListAPIView.as_view(), name='state_position'),
    path('api/employee/', EmployeeListAPIView.as_view(), name='employee'),
]

urlpatterns += router.urls
