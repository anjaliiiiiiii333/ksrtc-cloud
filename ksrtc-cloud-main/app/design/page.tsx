import { Button } from "@/frontend-design/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/frontend-design/components/ui/card"
import { Input } from "@/frontend-design/components/ui/input"

export default function DesignShowcase() {
    return (
        <div className="min-h-screen bg-background p-10 font-sans text-foreground">
            <div className="mx-auto max-w-4xl space-y-10">
                <header>
                    <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
                    <p className="mt-2 text-muted-foreground">
                        A collection of base components for the application.
                    </p>
                </header>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon">Icon</Button>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Inputs</h2>
                    <div className="grid max-w-sm gap-4">
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Input disabled placeholder="Disabled" />
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Cards</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create project</CardTitle>
                                <CardDescription>
                                    Deploy your new project in one-click.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Input id="name" placeholder="Name of your project" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Deploy</Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>
                                    Manage your notification preferences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center gap-4 rounded-md border p-4 bg-background">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Push Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Send notifications to device.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Save preferences</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Colors</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <div className="h-20 w-full rounded-md bg-primary shadow-sm"></div>
                            <p className="text-xs font-mono text-muted-foreground">Primary</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-20 w-full rounded-md bg-secondary shadow-sm"></div>
                            <p className="text-xs font-mono text-muted-foreground">Secondary</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-20 w-full rounded-md bg-accent shadow-sm"></div>
                            <p className="text-xs font-mono text-muted-foreground">Accent</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-20 w-full rounded-md bg-muted shadow-sm"></div>
                            <p className="text-xs font-mono text-muted-foreground">Muted</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-20 w-full rounded-md bg-destructive shadow-sm"></div>
                            <p className="text-xs font-mono text-muted-foreground">Destructive</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-20 w-full rounded-md bg-card border shadow-sm"></div>
                            <p className="text-xs font-mono text-muted-foreground">Card</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
