import { Key, Smartphone, Mail, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SecuritySettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account security and authentication</p>
      </div>

      <div className="space-y-6">
        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Key className="h-5 w-5" /> Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* 2FA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="h-5 w-5" /> Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="success">Enabled</Badge>
                <span className="text-sm text-muted-foreground">Authenticator app configured</span>
              </div>
              <Button variant="outline" size="sm">Reconfigure</Button>
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5" /> Email Address
            </CardTitle>
            <CardDescription>Your primary email for notifications and login</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm font-mono">user@example.com</span>
            <Button variant="outline" size="sm">Change</Button>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5" /> Active Sessions
            </CardTitle>
            <CardDescription>Devices currently signed into your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">Windows — Chrome</p>
                <p className="text-xs text-muted-foreground">Los Angeles, US · Current session</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">iPhone — Safari</p>
                <p className="text-xs text-muted-foreground">Last active: 2 days ago</p>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
