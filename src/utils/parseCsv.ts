export const parseCsv = (csvText: string): Record<string, string>[] => {
    const lines = csvText.trim().split("\n")
    const headers = lines[0].replace(/"/g, "").split(",")
  
    return lines.slice(1).map((line) => {
      const values = line.split(/["']/).filter(value => {
        const cleanValue = value.replace(/"/g, "").trim()

        return  !/^,+$/.test(cleanValue)
      }).slice(1, -1)

      const client: Record<string, string> = {}
  
      headers.map((header, index) => {
        client[header] = values[index]
      })

      console.log(client)

      return client
    })
  }