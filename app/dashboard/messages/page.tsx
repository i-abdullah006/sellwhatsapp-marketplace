"use client"

import { useState } from "react"
import { Search, Send, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const conversations = [
  { id: "1", name: "TrustedSeller", lastMessage: "Yes, the account is still available. I can transfer it today.", time: "5m ago", unread: 2, online: true },
  { id: "2", name: "USAccounts", lastMessage: "Payment received. Transferring now.", time: "1h ago", unread: 0, online: false },
  { id: "3", name: "VintageLine", lastMessage: "Thanks for your offer! I'll consider it.", time: "3h ago", unread: 1, online: true },
]

const messages = [
  { id: "m1", from: "them", text: "Hi! Is the Premium Business WhatsApp still available?", time: "10:30 AM" },
  { id: "m2", from: "me", text: "Yes, it is! What's your best price?", time: "10:32 AM" },
  { id: "m3", from: "them", text: "Yes, the account is still available. I can transfer it today.", time: "10:35 AM" },
]

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null)

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversation list */}
      <div className={cn(
        "w-full border-r lg:w-80 lg:block",
        activeChat ? "hidden" : "block"
      )}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </div>
        <Separator />
        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className="w-full text-left p-4 hover:bg-accent transition-colors border-b"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-sm">
                    {conv.name[0]}
                  </div>
                  {conv.online && <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-emerald-500 fill-emerald-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="h-5 min-w-[1.25rem] rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className={cn(
        "flex-1 flex flex-col",
        !activeChat ? "hidden lg:flex" : "flex"
      )}>
        {activeChat ? (
          <>
            <div className="flex items-center gap-3 p-4 border-b">
              <button onClick={() => setActiveChat(null)} className="lg:hidden text-sm text-primary hover:underline">
                ← Back
              </button>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-medium text-sm">
                {conversations.find(c => c.id === activeChat)?.name[0]}
              </div>
              <p className="font-semibold">{conversations.find(c => c.id === activeChat)?.name}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.from === "me"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  )}>
                    <p>{msg.text}</p>
                    <p className={cn("text-xs mt-1", msg.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea placeholder="Type a message..." className="min-h-[44px] resize-none" rows={1} />
                <Button size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
