from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, full_name, email, username, mobile, password):
        if not email:
            raise ValueError('Emile is required.')
        if not username:
            raise ValueError('username is required.')
        if not mobile:
            raise ValueError('Number is required.')
        if not full_name:
            raise ValueError('Full name is required.')

        user = self.model(
            full_name=full_name,
            email=self.normalize_email(email),
            username=username,
            mobile=mobile
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, full_name, email, username, mobile, password):
        user = self.create_user(
            full_name=full_name,
            email=self.normalize_email(email),
            password=password,
            username=username,
            mobile=mobile
        )

        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    mobile = models.CharField(max_length=100, help_text='+(995) 5** - *** - ***')
    password = models.CharField(max_length=100)

    data_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'username', 'mobile']

    objects = UserManager()

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return f'{self.id}) {self.full_name} - {self.mobile} - {self.email}'


class Guests(models.Model):
    email = models.EmailField(unique=True)
    number = models.CharField(max_length=20)
    message = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.number} - {self.message}'
