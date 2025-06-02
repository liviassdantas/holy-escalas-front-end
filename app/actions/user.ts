"use server"

import { z } from "zod"

// Schema de validação
const UserSchema = z.object({
  name: z.string().min(5, "Nome deve ter pelo menos 5 caracteres"),
  birthdayDate: z.string(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phoneNumber: z.string(),
  team: z.string(),
  team_function: z.string(),
  isLeader: z.boolean(),
})

export type UserFormData = z.infer<typeof UserSchema>

export async function createUser(formData: UserFormData) {
  try {
    // Validar dados
    const validatedData = UserSchema.parse(formData)

    // Simular chamada à API (substitua pelo seu endpoint real)
    // const response = await fetch('https://sua-api.com/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData)
    // })

    // Simulação de resposta
    console.log("Usuário criado:", validatedData)

    // Retornar sucesso
    return { success: true, data: validatedData }
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, message: "Erro ao criar usuário" }
  }
}
