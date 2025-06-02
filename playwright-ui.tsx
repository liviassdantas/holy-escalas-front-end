"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  RotateCcw,
  Search,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Circle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Maximize2,
} from "lucide-react"

export default function Component() {
  const [selectedTest, setSelectedTest] = useState("should display welcome message")
  const [expandedFolders, setExpandedFolders] = useState(new Set(["tests", "auth"]))
  const [watchedTests, setWatchedTests] = useState(new Set())
  const [filterText, setFilterText] = useState("")

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder)
    } else {
      newExpanded.add(folder)
    }
    setExpandedFolders(newExpanded)
  }

  const toggleWatch = (testName: string) => {
    const newWatched = new Set(watchedTests)
    if (newWatched.has(testName)) {
      newWatched.delete(testName)
    } else {
      newWatched.add(testName)
    }
    setWatchedTests(newWatched)
  }

  const testFiles = [
    {
      name: "tests",
      type: "folder",
      children: [
        {
          name: "auth",
          type: "folder",
          children: [
            {
              name: "login.spec.ts",
              type: "file",
              tests: [
                { name: "should display login form", status: "passed" },
                { name: "should validate required fields", status: "passed" },
                { name: "should login with valid credentials", status: "failed" },
              ],
            },
            {
              name: "signup.spec.ts",
              type: "file",
              tests: [
                { name: "should display signup form", status: "passed" },
                { name: "should create new account", status: "skipped" },
              ],
            },
          ],
        },
        {
          name: "dashboard",
          type: "folder",
          children: [
            {
              name: "home.spec.ts",
              type: "file",
              tests: [
                { name: "should display welcome message", status: "running" },
                { name: "should show user stats", status: "pending" },
              ],
            },
          ],
        },
      ],
    },
  ]

  const actions = [
    { time: "0:00.123", action: "navigate", locator: "page", description: "Navigate to http://localhost:3000" },
    {
      time: "0:00.456",
      action: "click",
      locator: "getByRole('button', { name: 'Login' })",
      description: "Click login button",
    },
    { time: "0:00.789", action: "fill", locator: "getByLabel('Email')", description: "Fill email field" },
    { time: "0:01.012", action: "fill", locator: "getByLabel('Password')", description: "Fill password field" },
    {
      time: "0:01.234",
      action: "click",
      locator: "getByRole('button', { name: 'Submit' })",
      description: "Click submit button",
    },
  ]

  const renderTestTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index} style={{ marginLeft: `${level * 16}px` }}>
        {item.type === "folder" ? (
          <div>
            <div
              className="flex items-center gap-2 py-1 px-2 hover:bg-gray-800 cursor-pointer rounded"
              onClick={() => toggleFolder(item.name)}
            >
              {expandedFolders.has(item.name) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
            {expandedFolders.has(item.name) && item.children && <div>{renderTestTree(item.children, level + 1)}</div>}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 py-1 px-2 hover:bg-gray-800 cursor-pointer rounded">
              <div className="w-4 h-4" />
              <span className="text-sm text-blue-400">{item.name}</span>
            </div>
            {item.tests && (
              <div>
                {item.tests.map((test: any, testIndex: number) => (
                  <div
                    key={testIndex}
                    className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-800 cursor-pointer rounded ml-4 ${
                      selectedTest === test.name ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setSelectedTest(test.name)}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {test.status === "passed" && <CheckCircle className="w-3 h-3 text-green-500" />}
                      {test.status === "failed" && <XCircle className="w-3 h-3 text-red-500" />}
                      {test.status === "running" && <Clock className="w-3 h-3 text-yellow-500 animate-spin" />}
                      {test.status === "skipped" && <Circle className="w-3 h-3 text-gray-500" />}
                      {test.status === "pending" && <Circle className="w-3 h-3 text-gray-400" />}
                    </div>
                    <span className="text-sm text-gray-300 flex-1">{test.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(test.name)
                      }}
                      className="opacity-0 group-hover:opacity-100 hover:text-blue-400"
                    >
                      {watchedTests.has(test.name) ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <Button size="sm" variant="ghost" className="text-green-500 hover:text-green-400">
              <Play className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-300">
              <Pause className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-300">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <div className="flex-1" />
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-300">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Filter tests..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-green-900 text-green-300 hover:bg-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Passed
            </Badge>
            <Badge variant="secondary" className="bg-red-900 text-red-300 hover:bg-red-800">
              <XCircle className="w-3 h-3 mr-1" />
              Failed
            </Badge>
            <Badge variant="secondary" className="bg-gray-700 text-gray-300 hover:bg-gray-600">
              <Circle className="w-3 h-3 mr-1" />
              Skipped
            </Badge>
          </div>
        </div>

        {/* Test Tree */}
        <ScrollArea className="flex-1 p-2">
          <div className="group">{renderTestTree(testFiles)}</div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Timeline */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-4">
          <div className="flex-1 relative">
            <div className="h-2 bg-gray-700 rounded-full relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 w-3/4 rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white opacity-50"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0:00.000</span>
              <span>0:01.234</span>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="ml-4">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="actions" className="flex-1 flex flex-col">
            <TabsList className="bg-gray-800 border-b border-gray-700 rounded-none justify-start h-auto p-0">
              <TabsTrigger
                value="actions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Actions
              </TabsTrigger>
              <TabsTrigger
                value="call"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Call
              </TabsTrigger>
              <TabsTrigger
                value="log"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Log
              </TabsTrigger>
              <TabsTrigger
                value="errors"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Errors
              </TabsTrigger>
              <TabsTrigger
                value="console"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Console
              </TabsTrigger>
              <TabsTrigger
                value="network"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Network
              </TabsTrigger>
            </TabsList>

            <TabsContent value="actions" className="flex-1 m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {actions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 py-2 px-3 hover:bg-gray-800 rounded cursor-pointer border-l-2 border-transparent hover:border-blue-500"
                    >
                      <div className="text-xs text-gray-500 font-mono w-16 flex-shrink-0 mt-1">{action.time}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {action.action}
                          </Badge>
                          <span className="text-sm text-gray-300">{action.description}</span>
                        </div>
                        <div className="text-xs text-blue-400 font-mono">{action.locator}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="call" className="flex-1 m-0">
              <div className="p-4 text-gray-400">
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Method:</span> click
                  </div>
                  <div>
                    <span className="text-gray-500">Selector:</span> getByRole('button', {"{ name: 'Submit' }"})
                  </div>
                  <div>
                    <span className="text-gray-500">Strict:</span> true
                  </div>
                  <div>
                    <span className="text-gray-500">Timeout:</span> 30000ms
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="log" className="flex-1 m-0">
              <ScrollArea className="h-full">
                <div className="p-4 font-mono text-xs space-y-1">
                  <div className="text-gray-500">waiting for getByRole('button', {"{ name: 'Submit' }"})</div>
                  <div className="text-gray-500">locator resolved to {"<button>Submit</button>"}</div>
                  <div className="text-gray-500">attempting click action</div>
                  <div className="text-gray-500">waiting for element to be visible, enabled and stable</div>
                  <div className="text-green-400">element is visible, enabled and stable</div>
                  <div className="text-green-400">scrolling into view if needed</div>
                  <div className="text-green-400">done scrolling</div>
                  <div className="text-green-400">performing click action</div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="errors" className="flex-1 m-0">
              <div className="p-4">
                <div className="text-red-400 text-sm">No errors found for this test.</div>
              </div>
            </TabsContent>

            <TabsContent value="console" className="flex-1 m-0">
              <ScrollArea className="h-full">
                <div className="p-4 font-mono text-xs space-y-1">
                  <div className="text-blue-400">[LOG] User clicked submit button</div>
                  <div className="text-yellow-400">[WARN] Form validation triggered</div>
                  <div className="text-green-400">[INFO] Form submitted successfully</div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="network" className="flex-1 m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm py-2 border-b border-gray-800">
                      <Badge className="bg-green-900 text-green-300">200</Badge>
                      <span className="text-blue-400">POST</span>
                      <span className="text-gray-300">/api/auth/login</span>
                      <span className="text-gray-500 ml-auto">245ms</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm py-2 border-b border-gray-800">
                      <Badge className="bg-green-900 text-green-300">200</Badge>
                      <span className="text-blue-400">GET</span>
                      <span className="text-gray-300">/api/user/profile</span>
                      <span className="text-gray-500 ml-auto">123ms</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
