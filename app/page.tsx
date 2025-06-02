"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "Geovanna",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center">
        <button className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-medium text-teal-600">Criar novo cadastro</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pb-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <div className="w-20 h-20 rounded-full bg-gray-400"></div>
          </div>
          <button type="button" className="text-teal-600 font-medium">
            Escolher foto
          </button>
        </div>

        {/* Personal Information */}
        <div className="space-y-4 mb-6">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            className="border-teal-100 focus:border-teal-500 rounded-md"
          />
          <Input
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Sobrenome"
            className="border-teal-100 focus:border-teal-500 rounded-md"
          />
        </div>

        {/* Team and Role Selection */}
        <div className="space-y-4 mb-6">
          <Select>
            <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
              <SelectValue placeholder="Selecione sua equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worship">Louvor</SelectItem>
              <SelectItem value="tech">Técnica</SelectItem>
              <SelectItem value="production">Produção</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
              <SelectValue placeholder="Selecione sua função" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leader">Líder</SelectItem>
              <SelectItem value="vocalist">Vocalista</SelectItem>
              <SelectItem value="musician">Músico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Music and Instrument */}
        <div className="space-y-4 mb-6">
          <Select defaultValue="music">
            <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="music">Música</SelectItem>
              <SelectItem value="dance">Dança</SelectItem>
              <SelectItem value="theater">Teatro</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="guitar">
            <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guitar">Violão</SelectItem>
              <SelectItem value="piano">Piano</SelectItem>
              <SelectItem value="drums">Bateria</SelectItem>
              <SelectItem value="bass">Baixo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Social Media */}
        <div className="space-y-4 mb-6">
          <Select defaultValue="social">
            <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="social">Redes Sociais</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-full h-12 bg-gray-100 rounded-md flex items-center px-4 text-gray-400">
            <span className="flex-1">Selecione sua função</span>
            <Check className="h-5 w-5 text-teal-500 opacity-50" />
          </div>
        </div>

        {/* Add Team/Function Button */}
        <div className="mb-6">
          <button type="button" className="flex items-center text-gray-700 font-medium">
            <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center mr-2">
              <Plus className="h-4 w-4 text-white" />
            </div>
            Adicionar equipe/função
          </button>
        </div>

        {/* Account Information */}
        <div className="space-y-4 mb-8">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border-teal-100 focus:border-teal-500 rounded-md"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            className="border-teal-100 focus:border-teal-500 rounded-md"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repetir senha"
            className="border-teal-100 focus:border-teal-500 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 rounded-md">
          Criar cadastro
        </Button>
      </form>
    </div>
  )
}
