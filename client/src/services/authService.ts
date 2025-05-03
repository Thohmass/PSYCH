import { useState } from 'react';
// import {UserRole} from "@myproject/shared";
// import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { UserRole } from "@myproject/shared";

interface LoginResponse {
  message: string;
  token: string; // Pridávame token
  role: UserRole; // Predpokladáme, že backend vracia rolu v tomto formáte
}

export const loginUser = async (email: string, password: string) => {

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json() as LoginResponse;

    if (response.ok) {
      console.log('Úspešne prihlásený ako:', data.role);
      return data as LoginResponse;

    } else {
      throw new Error(data.message || 'Nepodarilo sa prihlásiť.');
    }
  } catch (error: any) {
    console.error('Chyba pri prihlasovaní:', error);
    throw error;
  }
}

export const logoutUser = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Nepodarilo sa odhlásiť používateľa.');
    }

    console.log('Úspešne odhlásený používateľ.');
    return;

  } catch (error: unknown) {
    console.error('Chyba pri odhlasovaní používateľa.', error);
    throw error;
  }
}