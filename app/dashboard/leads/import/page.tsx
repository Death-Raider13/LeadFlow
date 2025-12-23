"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).filter(Boolean)
  if (lines.length === 0) return []
  const headers = lines[0].split(",").map((h) => h.trim())
  const rows = lines.slice(1)
  return rows.map((r) => {
    const values = r.split(",")
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => {
      obj[h] = (values[i] || "").trim()
    })
    return obj
  })
}

export default function ImportLeadsPage() {
  const [parsed, setParsed] = useState<Record<string, string>[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file")
      return
    }

    const text = await file.text()
    try {
      const data = parseCSV(text)
      setParsed(data)
    } catch (err) {
      setError("Failed to parse CSV file")
      console.error(err)
    }
  }

  const handleImport = async () => {
    setError(null)
    if (parsed.length === 0) {
      setError("No data to import")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/leads/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads: parsed }),
      })

      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || "Import failed")
        setIsLoading(false)
        return
      }

      router.push("/dashboard/leads")
      router.refresh()
    } catch (err) {
      console.error(err)
      setError("Import failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Import Leads</h1>
        <p className="text-muted-foreground">Upload a CSV file with lead data. Expected headers: name,email,phone,source,status,notes</p>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <Input type="file" accept=".csv,text/csv" onChange={handleFile} />

            {error && <p className="text-sm text-destructive">{error}</p>}

            {parsed.length > 0 && (
              <div>
                <p className="text-sm mb-2">Preview ({parsed.length} rows)</p>
                <div className="overflow-auto max-h-48 border rounded">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {Object.keys(parsed[0]).map((h) => (
                          <th key={h} className="px-2 py-1 text-left bg-muted/50">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {parsed.slice(0, 10).map((row, i) => (
                        <tr key={i} className="border-t">
                          {Object.keys(row).map((k) => (
                            <td key={k} className="px-2 py-1 truncate">{row[k]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleImport} disabled={isLoading || parsed.length === 0}>
                {isLoading ? "Importing..." : "Import CSV"}
              </Button>
              <Button variant="outline" onClick={() => { setParsed([]); setError(null) }}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
