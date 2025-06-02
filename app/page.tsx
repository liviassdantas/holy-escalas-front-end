"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUser, type UserFormData } from "./actions/user"
import { useRouter } from "next/navigation"

export default function RegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    birthdayDate: "",
    email: "",
    phoneNumber: "",
    password: "",
    isLeader: false,
    team: "",
    team_function: ""
  })
  type OptionType = {
  value: string;
  label: string;
};

  type OptionsType = {
    [key: string]: OptionType[];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSelectedCategory(value);
  }
  const handleSelectChangeFunction = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSelectedFunction(value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createUser(formData)

      if (result.success) {
        // Redirecionar para página de sucesso ou dashboard
        console.log("Cadastro realizado com sucesso!")
        // router.push("/sucesso")
      } else {
        setError(result.message || "Erro ao processar cadastro")
      }
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação")
    } finally {
      setIsSubmitting(false)
    }
  }
  
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedFunction, setSelectedFunction] = useState("");

    const options: OptionsType = {
      Canteen_Team: [
        { value: "Canteen_Team_Kitchen", label: "Cozinha" },
        { value: "Canteen_Team_Cash", label: "Caixa" },
      ],
      Ilumination_Team: [
        { value: "Ilumination_Team_Light", label: "Iluminação" },
      ],
      Music_Team: [
        { value: "Music_Team_Bass", label: "Baixo" },
        { value: "Music_Team_Drum", label: "Bateria" },
        { value: "Music_Team_Eletric_Guitar", label: "Guitarra" },
        { value: "Music_Team_Keyboard", label: "Teclado" },
        { value: "Music_Team_Vocal_Leader", label: "Líder Vocal" },
        { value: "Music_Team_Vocal", label: "Vocal" },
        { value: "Music_Team_Guitar", label: "Violão" }
      ],
      Infantile_Team: [
        { value: "Infantile_Team_Toddlers", label: "Crianças - 2 a 7 anos" },
        { value: "Infantile_Team_Childreen", label: "Crianças - 7 a 10 anos" },
      ],
      Projection_Team: [
        { value: "Projection_Team_Projection", label: "Projeção" },
      ],
      Reception_Team: [
        { value: "Reception_Team_Infront", label: "Entrada - Portão Principal" },
        { value: "Reception_Team_Temple", label: "Templo" },
      ],
      SocialMedia_Team: [
        { value: "Social_Media_Team_Instagram", label: "Redes Sociais" },
      ],
      Sound_Team: [
        { value: "Sound_Management", label: "Gerenciamento de Áudio" },
      ],
    };

    return (
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="p-4 flex items-center">
          <button className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-medium text-teal-600">Criar novo cadastro</h1>
        </div>

        {error && <div className="mx-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">{error}</div>}

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
              name="birthdayDate"
              value={formData.birthdayDate}
              onChange={handleChange}
              placeholder="Data de Nascimento (00/00/0000)"
              className="border-teal-100 focus:border-teal-500 rounded-md"
            />
            <Input
              name="Telefone"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Telefone com DDD"
              className="border-teal-100 focus:border-teal-500 rounded-md"
            />
          </div>

          {/* Team and Role Selection */}
          <div className="space-y-4 mb-6">
            <Select onValueChange={(value) => handleSelectChange("team", value)}>
              <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
                <SelectValue placeholder="Selecione sua equipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Canteen_Team">Cantina</SelectItem>
                <SelectItem value="Ilumination_Team">Iluminação</SelectItem>
                <SelectItem value="Music_Team">Ministério de Música</SelectItem>
                <SelectItem value="Infantile_Team">Ministério Infantil</SelectItem>
                <SelectItem value="Projection_Team">Projeção</SelectItem>
                <SelectItem value="Reception_Team">Recepção</SelectItem>
                <SelectItem value="SocialMedia_Team">Redes Sociais</SelectItem>
                <SelectItem value="Sound_Team">Sonoplastia</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleSelectChangeFunction("team_function", value)}>
              <SelectTrigger className="w-full border-teal-100 focus:border-teal-500 rounded-md">
                <SelectValue placeholder="Selecione sua função" />
              </SelectTrigger>
              <SelectContent>
                {options[selectedCategory]?.map((option: OptionType) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              placeholder="Repetir senha"
              className="border-teal-100 focus:border-teal-500 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Criar cadastro"}
          </Button>
        </form>
      </div>
    )
  }
