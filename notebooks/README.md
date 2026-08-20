# PhishGuard AI — Colab Training Notebooks

These notebooks are the RQ-stage training pipeline used for the CSE432 NLP project.
Run in order on Google Colab (T4 GPU recommended).

Repository: https://github.com/sayedio/fishguard

| Order | Notebook | Purpose |
|------:|----------|---------|
| 00 | `00_stage0_setup_dual_pipeline_cleaning.ipynb` | Stage 0 — Setup & Dual-Pipeline Cleaning |
| 01 | `01_exploratory_data_analysis.ipynb` | RQ1 — Exploratory Data Analysis (EDA) |
| 02 | `02_preprocessing_imbalance_handling.ipynb` | RQ2 — Preprocessing Documentation & Imbalance Handling |
| 03 | `03_tfidf_ngram_feature_engineering.ipynb` | RQ3 — Feature Engineering (TF-IDF + DL Tokenizer) |
| 04 | `04_classical_ml_models.ipynb` | RQ4 — Classical ML Models (NB, LogReg, SVM, RF, XGBoost) |
| 05 | `05_deep_learning_bilstm_textcnn.ipynb` | RQ5 — Deep Learning Models (BiLSTM + TextCNN) |
| 06 | `06_distilbert_transformer_finetune.ipynb` | RQ6 — Transformer Model (DistilBERT Fine-tuning) |
| 07 | `07_hyperparameter_tuning.ipynb` | RQ7 — Hyperparameter Tuning (Classical Models) |
| 08 | `08_master_comparison_evaluation.ipynb` | RQ8 — Master Comparison Table & Full Evaluation |
| 09 | `09_explainability_lime_shap.ipynb` | RQ9 — Explainability (LIME + DistilBERT SHAP/Attention) |

## Notes

- Stage 0 writes `train.csv` / `val.csv` / `test.csv` once; later stages load those artifacts.
- Do not rename output folders expected by later stages without updating paths.

