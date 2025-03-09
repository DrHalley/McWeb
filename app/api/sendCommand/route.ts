import { NextRequest, NextResponse } from "next/server";
import {Rcon} from "rcon-client";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { serverIp, port, password, command } = body;

        if (!serverIp || !port || !password || !command) {
            return NextResponse.json({ message: "Eksik parametreler var!" }, { status: 400 });
        }

        const rcon = await Rcon.connect({
            host: serverIp,
            port: port,
            password: password
        });
    
        const response = await rcon.send(command);
        console.log("Server answer:", response);
        rcon.end();

        

        return NextResponse.json({ message: "Komut başarıyla gönderildi", response }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
