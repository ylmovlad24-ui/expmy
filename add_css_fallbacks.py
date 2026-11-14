#!/usr/bin/env python3
"""
Add fallback values to all var() CSS function calls that don't already have them.
Skips .min.css files and var() calls inside :root variable definitions.
"""

import os
import re
from pathlib import Path

# Mapping of CSS variable names to their fallback values
FALLBACKS = {
    'primary': '#2a5b9a',
    'accent': '#e67e22',
    'text': '#333333',
    'text-light': '#666666',
    'bg': '#ffffff',
    'bg-light': '#f8f9fa',
    'white': '#ffffff',
    'border': '#e0e4e8',
    'dark-bg': '#2a5b9a',
    'dark-bg-alt': '#1a4070',
    'white-75': 'rgba(255,255,255,0.75)',
    'white-85': 'rgba(255,255,255,0.85)',
    'white-50': 'rgba(255,255,255,0.5)',
    'white-60': 'rgba(255,255,255,0.6)',
    'white-40': 'rgba(255,255,255,0.4)',
    'success': '#059669',
    'danger': '#dc2626',
    'purple': '#6c5ce7',
    'gray-medium': '#4a5568',
    'gray-light': '#a0aec0',
    'gray-100': '#f7fafc',
    'gray-200': '#edf2f7',
    'accent-hover': '#cf6d15',
    'accent-bg': 'rgba(230,126,34,0.05)',
    'accent-bg-hover': 'rgba(230,126,34,0.08)',
    'accent-bg-soft': 'rgba(230,126,34,0.1)',
    'shadow-button': '0 2px 8px rgba(230,126,34,0.3)',
    'shadow-button-hover': '0 8px 25px rgba(230,126,34,0.4)',
    'shadow-card': '0 1px 3px rgba(0,0,0,0.06)',
    'shadow-card-hover': '0 20px 25px rgba(0,0,0,0.08)',
    'radius-card': '8px',
    'radius-lg': '12px',
    'radius-section': '12px',
    'font-family': "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    'fs-base': '1rem',
    'fs-sm': '0.8125rem',
    'fs-lg': '1.125rem',
    'fs-xl': '1.25rem',
    'fs-md': '1.0625rem',
    'fs-2xl': '1.5rem',
    'fs-3xl': '1.75rem',
    'fs-4xl': '2rem',
    'fs-5xl': '2.25rem',
    'fs-hero': '2.5rem',
    'fw-medium': '500',
    'fw-semibold': '600',
    'fw-bold': '700',
    'transition-normal': '0.3s',
    'transition-fast': '0.15s',
    'transition-slow': '0.5s',
    'space-2': '8px',
    'space-4': '16px',
    'space-6': '24px',
    'space-8': '32px',
    'space-10': '40px',
    'space-12': '48px',
    'space-16': '64px',
    'max-width': '1120px',
    'header-height': '64px',
}


def is_in_root_definition(line):
    """
    Check if a line is inside a :root variable definition.
    Returns True if the line contains a variable assignment like `--var: var(--other)`
    """
    # If line contains a CSS custom property definition (e.g., --space-xs: var(--space-2))
    # and the var() is on the right side of the colon, it's a definition
    if re.search(r'--[a-zA-Z0-9_-]+\s*:\s*var\(', line):
        return True
    return False


def process_file(filepath):
    """Process a single CSS file and add fallbacks to var() calls."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    total_replacements = 0
    
    # Process line by line to handle :root definitions
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if is_in_root_definition(line):
            # Skip lines with var() in :root definitions
            new_lines.append(line)
            continue
        
        # Find all var(--name) that don't have a fallback
        # Pattern: var(--name) where name is one of our known variables
        # We need to match var(--name) but NOT var(--name, ...)
        for var_name, fallback in FALLBACKS.items():
            # Match var(--name) that is NOT followed by a comma (which would mean it already has a fallback)
            # Use negative lookahead to ensure no comma follows
            pattern = r'var\(\s*' + re.escape(var_name) + r'\s*\)(?!\s*,)'
            matches = list(re.finditer(pattern, line))
            if matches:
                line = re.sub(pattern, f'var(--{var_name}, {fallback})', line)
                total_replacements += len(matches)
        
        new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    if new_content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return total_replacements


def main():
    css_base = Path('assets/css')
    
    # Find all non-minified CSS files
    css_files = []
    for ext in ['*.css']:
        css_files.extend(css_base.glob(f'**/{ext}'))
    
    # Filter out .min.css files
    source_files = [f for f in css_files if not f.name.endswith('.min.css')]
    
    # Sort for consistent output
    source_files.sort()
    
    print(f"Found {len(source_files)} source CSS files to process.\n")
    
    results = []
    total_all = 0
    
    for filepath in source_files:
        replacements = process_file(filepath)
        if replacements > 0:
            results.append((str(filepath), replacements))
            total_all += replacements
            print(f"  {filepath}: {replacements} replacements")
    
    print(f"\n{'='*60}")
    print(f"SUMMARY: {len(results)} files modified, {total_all} total replacements")
    print(f"{'='*60}")
    
    if results:
        print("\nFiles modified:")
        for filepath, count in results:
            print(f"  {filepath}: {count} replacements")


if __name__ == '__main__':
    main()
