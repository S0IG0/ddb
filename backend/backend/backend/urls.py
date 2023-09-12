from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from customer.views import CustomerRegisterView
from employee.views import EmployeeViewSet

router = SimpleRouter()
router.register(r'api/employee', EmployeeViewSet)

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/customer/register/', CustomerRegisterView.as_view(), name='register_user'),
]

urlpatterns += router.urls
