import type { ResponseContract } from '@ioc:Adonis/Core/Response'

export default class BaseController {
  public sendSuccessResponse(
    response: ResponseContract,
    message: string,
    data: object = {},
    statusCode: number = 200
  ) {
    return response.status(statusCode).json({ status: 'success', message, data })
  }

  public sendErrorResponse(response: ResponseContract, error: any) {
    if (error.status) {
      return response.status(error.status).json({ status: 'error', message: error.message })
    }
    return response.status(500).json({
      status: 'error',
      message: 'E_INTERNAL_SERVER_ERROR: An error occurred while processing your request.',
    })
  }
}
