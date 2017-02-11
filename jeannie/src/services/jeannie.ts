/// <reference path="../../typings/sockjs/sockjs" />
import * as SockJS from 'sockjs-client';

export class JeannieService {
	URL: string = 'http://10.111.40.164:8080/jeannie';
	sock: SockJS;
	handlers = {};

	private _opened: boolean = false;

	public open(): void {
		if (!this._opened) {
			this.sock = new SockJS(this.URL);
			this.sock.onopen = (e) => {
				this.callHandlers('open', e);
			}
			this.sock.onmessage = (e) => {
				this.messageReceived(e);
			}
			this.sock.onclose = (e) => {
				this.callHandlers('close', e);
			}
			this._opened = true;
		}
	}

	public isOpen(): boolean {
		return this._opened;
	}

	public close(): void {
		if (this._opened) {
			this.sock.close();
			delete this.sock;
			this._opened = false;
		}
	}

	private messageReceived (e: SJSMessageEvent) {
		var msg = JSON.parse(e.data);
    this.callHandlers('message', msg);
	}

	private callHandlers (type: string, ...params: any[]) {
		if (this.handlers[type]) {
			this.handlers[type].forEach(function(cb) {
				cb.apply(cb, params);
			});
		}
	}

	private addEvent (type: string, callback: Function) : void {
		if (!this.handlers[type]) this.handlers[type] = [];
		this.handlers[type].push(callback);
	}

	public onOpen (callback: (e: SJSOpenEvent) => any) : void {
		this.addEvent('open', callback);
	}
	public onMessage (callback: (data: any) => any) : void {
		this.addEvent('message', callback);
	}
  public onResult (callback: (data: any) => any) : void {
    this.addEvent('result', callback);
  }
	public onBoardUpdate (callback: (data: any) => any) : void {
		this.addEvent('board-update', callback);
	}
	public onThreadUpdate (callback: (data: any) => any) : void {
		this.addEvent('thread-update', callback);
	}
	public onClose (callback: (e: SJSCloseEvent) => any) : void {
		this.addEvent('close', callback);
	}

	public send (action: string, data: any) {
		if (this._opened) {
			var msg = JSON.stringify({
				action: action,
				data: data
			});

			this.sock.send(msg);
		}
	}
}
