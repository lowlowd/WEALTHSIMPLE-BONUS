# Compare-Posts.ps1
# Generates a single markdown document with EN/FR post pairs for review

$mapping = @{
    "add-referral-code-after-signup.md" = "ajouter-code-parrainage-apres-inscription.md"
    "core-vs-premium-vs-generation.md" = "core-vs-premium-vs-generation.md"
    "promo-code-vs-referral-code.md" = "code-promo-vs-code-parrainage.md"
    "referral-bonus-terms-conditions.md" = "conditions-prime-parrainage.md"
    "referral-ladder-challenge.md" = "defi-echelle-parrainage.md"
    "wealthsimple-cash-account-review.md" = "evaluation-compte-wealthsimple-comptant.md"
    "wealthsimple-guide.md" = "guide-wealthsimple.md"
    "wealthsimple-tax-review-2025.md" = "evaluation-wealthsimple-impot-2025.md"
    "wealthsimple-crypto-vs-newton-vs-shakepay.mdx" = "wealthsimple-crypto-vs-newton-vs-shakepay.mdx"
    "wealthsimple-vs-questrade-2025.mdx" = "wealthsimple-vs-questrade-2025.mdx"
}

$outputFile = "docs/post-comparison-review.md"
$output = @()

$output += "# EN/FR Post Comparison Review"
$output += ""
$output += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
$output += ""
$output += "---"
$output += ""

# Summary table
$output += "## Summary"
$output += ""
$output += "| # | Post | EN Lines | FR Lines | % |"
$output += "|---|------|----------|----------|---|"

$i = 1
foreach ($en in $mapping.Keys | Sort-Object) {
    $fr = $mapping[$en]
    $enPath = "src/data/post/$en"
    $frPath = "src/data/post/fr/$fr"
    
    if (Test-Path $enPath) {
        $enLines = (Get-Content $enPath | Measure-Object -Line).Lines
    } else { $enLines = 0 }
    
    if (Test-Path $frPath) {
        $frLines = (Get-Content $frPath | Measure-Object -Line).Lines
    } else { $frLines = 0 }
    
    $pct = if ($enLines -gt 0) { [math]::Round($frLines / $enLines * 100) } else { 0 }
    $output += "| $i | $($en.Substring(0, [math]::Min(35, $en.Length))) | $enLines | $frLines | $pct% |"
    $i++
}

$output += ""
$output += "---"
$output += ""

# Full content comparison
foreach ($en in $mapping.Keys | Sort-Object) {
    $fr = $mapping[$en]
    $enPath = "src/data/post/$en"
    $frPath = "src/data/post/fr/$fr"
    
    $output += "# $en"
    $output += ""
    
    # English version
    $output += "## ENGLISH VERSION"
    $output += ""
    $output += '```markdown'
    if (Test-Path $enPath) {
        $output += Get-Content $enPath -Raw
    } else {
        $output += "[FILE NOT FOUND: $enPath]"
    }
    $output += '```'
    $output += ""
    
    # French version
    $output += "## FRENCH VERSION"
    $output += ""
    $output += '```markdown'
    if (Test-Path $frPath) {
        $output += Get-Content $frPath -Raw
    } else {
        $output += "[FILE NOT FOUND: $frPath]"
    }
    $output += '```'
    $output += ""
    $output += "---"
    $output += ""
}

# Write output
$output | Out-File -FilePath $outputFile -Encoding UTF8
Write-Host "Created: $outputFile"
Write-Host "Total size: $((Get-Item $outputFile).Length / 1KB) KB"
