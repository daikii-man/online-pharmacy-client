'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProviderComponent } from "@/providers/nextUIProvider";
import { Toaster } from "@/components/toastComponent/toastComponent";
import ContextsProvider from "@/providers/contextsProvider";
import { axiosInstance } from "@/configs/axios.config";
import { PrimeReactProvider } from 'primereact/api';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Lexend_Exa } from 'next/font/google'
import { childrenProps } from "./types";
import Provider from "./provider";
import React from "react";
import "./globals.css";

const LexendExa = Lexend_Exa({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({ children }: childrenProps) {
  React.useEffect(() => {
    const requetToAPI = async () => {
      await axiosInstance.get('/')
    }

    const id = setInterval(requetToAPI, 1000)

    return () => { clearInterval(id) }
  })
  
  return (
    <html lang="en" className={LexendExa.className}>
      <body
      >
        <QueryClientProvider client={queryClient}>
          <ContextsProvider>
            <Header />
            <PrimeReactProvider>
              <NextUIProviderComponent>
                <Provider>
                  {children}
                </Provider>
              </NextUIProviderComponent>
            </PrimeReactProvider>
            <Toaster />
            <Footer />
          </ContextsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
