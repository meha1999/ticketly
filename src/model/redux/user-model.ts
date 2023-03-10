export interface UserModel {
  id: number;
  photo: string | ArrayBuffer | null;
  role: "superuser" | "customer" | "staff" | "supplier";
  last_login: string;
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  mobile_phone: string;
  mobile_phone_verified: boolean;
  telephone: string;
  telephone_verified: boolean;
  address: string;
  address_verified: boolean;
  postal_code: string;
  postal_code_verified: boolean;
  national_id: string;
  national_id_verified: boolean;
  birthday: string;
  account_type: string;
  groups: string[];
  user_permissions: string[];
  shahr: number | null;
  ostan: number | null;
  wallet_account: {
    id: number;
    updated_at: Date;
    created_at: Date;
    is_deleted: boolean;
    account: number;
    amount: number;
    max_debt: number;
    sheba: string | null;
    sheba_verified: boolean;
  };
}
