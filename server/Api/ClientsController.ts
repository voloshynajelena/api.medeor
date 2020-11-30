import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import { DBConnector } from '../DB/DBConnector';

export class ClientsController {
    private readonly app: Application;
    private constants = Constants
    private dbConnector: DBConnector = new DBConnector
    private defaultError: { error: string } = { error: "Can`t find the client." }

    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { getClients, getClient } } = this.constants;
        this.app.get(getClients, this.getClients)
        this.app.get(getClient, this.getClient)
    }

    private getClients = (req: Request, res: Response) => {
        const { query: { id } } = req;
        const clients: any[] = this.dbConnector.getClientsByDoctorId(String(id))
        const response = clients?.length ? { clients } : this.defaultError;
        res.json(response)
    }

    private getClient = (req: Request, res: Response) => {
        const { query: { id } } = req;
        const client: any = this.dbConnector.getClientById(String(id))
        const response = client || this.defaultError;
        res.json(response)
    }
}