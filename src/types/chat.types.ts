export interface IChatRequestDTO {
  doctorId: string
  patientId: string
  messages: {
    senderId: string
    recipientId: string
    content: string
  }
}

export interface IChatResponseDTO {
  doctorId: string
  patientId: string
  messages: {
    senderId: string
    recipientId: string
    content: string
  }
}
