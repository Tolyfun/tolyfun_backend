import requests
from django.conf import settings


class Paystack:
    def __init__(self):
        self.paystack_sk = settings.PAYSTACK_SECRET_KEY
        self.base_url = "https://api.paystack.co/"

    def verify_payment(self, ref, *args, **kwargs):
        path = f'transaction/verify/{ref}'
        headers = {
            "Authorization": f"Bearer {self.paystack_sk}",
            "Content-Type": "application/json",
        }
        url = self.base_url + path
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            response_data = response.json()
            return response_data['status'], response_data['message'], response_data['data']

        response_data = response.json()
        return response_data['status'], response_data['message'], response_data['message']

    def get_account_balance(self, *args, **kwargs):
        path = f'balance'
        headers = {
            "Authorization": f"Bearer {self.paystack_sk}",
            "Content-Type": "application/json",
        }
        url = self.base_url + path
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                response_data = response.json()
                return response_data['status'], response_data['data']
            response_data = response.json()
            return response_data['status'], response_data['message']
        except Exception as e:
            return False, str(e)
